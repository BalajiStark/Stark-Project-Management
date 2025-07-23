import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Task } from '../../shared/models/task';
import { ProjectService } from '../../shared/services/project.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-taskslist',
  templateUrl: './taskslist.component.html',
  styleUrl: './taskslist.component.css'
})
export class TaskslistComponent implements OnChanges, AfterViewInit {
  @Input() tasks!: Task[];
  @Input() assignee: string = '';
  @Input() priority: string = '';
  @Input() status: string = '';
  @Input() sort: string = '';
  notStarted = 0;
  inProgress = 0;
  done = 0;

  @Output() statusCounts = new EventEmitter<{ notStarted: number; inProgress: number; done: number }>();

  filteredTasks: Task[] = [];
  assignees: string[] = [];
  statuses: string[] = ['Not Started', 'In Progress', 'Completed'];
  priorities: string[] = ['Low', 'Medium', 'High'];
  projectId!: string;

  constructor(private projectService: ProjectService, private router: Router, private route: ActivatedRoute) {
    this.filteredTasks = this.tasks || [];

    this.projectService.getAssignees().subscribe(assignees => {
      if (assignees && assignees.length > 0) {
        this.assignees = assignees;
      }
    });
  }

  ngOnChanges(): void {
    this.filteredTasks = this.tasks || [];
    this.filterTasksByAssignee();
    this.filterTasksByPriority();
    this.filterTasksByStatus();
    this.sortTasks();
  }

  ngAfterViewInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id') || '';
    this.checkCounts();
  }

  filterTasksByAssignee() {
    this.filteredTasks = this.assignee === '' ? this.filteredTasks : this.filteredTasks.filter(task => task.assignedTo === this.assignee);
  }

  filterTasksByPriority() {
    this.filteredTasks = this.priority === '' ? this.filteredTasks : this.filteredTasks.filter(task => task.priority === this.priority);
  }

  filterTasksByStatus() {
    this.filteredTasks = this.status === '' ? this.filteredTasks : this.filteredTasks.filter(task => task.status === this.status);
  }

  sortTasks() {
    if (this.sort === 'Status') {
      this.filteredTasks.sort((a, b) => a.status.localeCompare(b.status));
    } else if (this.sort === 'Priority') {
      this.filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
    } else if (this.sort === 'Assigned To') {
      this.filteredTasks.sort((a, b) => a.assignedTo.localeCompare(b.assignedTo));
    } else {
      this.filteredTasks.sort((a, b) => a.id - b.id); // Sort by ID as default
    }
  }

  onAssigneeChange(task: Task, newAssignee: string) {
    this.filteredTasks = this.filteredTasks.map(t => {
      if (t.id === task.id) {
        this.updateTask({ ...t, assignedTo: newAssignee });
        return { ...t, assignedTo: newAssignee };
      }
      return t;
    });
  }

  onStatusChange(task: Task, newStatus: string) {
    this.filteredTasks = this.filteredTasks.map(t => {
      if (t.id === task.id) {
        this.updateTask({ ...t, status: newStatus });
        return { ...t, status: newStatus };
      }
      return t;
    });
  }

  onPriorityChange(task: Task, newPriority: string) {
    this.filteredTasks = this.filteredTasks.map(t => {
      if (t.id === task.id) {
        this.updateTask({ ...t, priority: newPriority });
        return { ...t, priority: newPriority };
      }
      return t;
    });
  }

  checkCounts() {
    this.notStarted = this.filteredTasks.filter(task => task.status === 'Not Started').length;
    this.inProgress = this.filteredTasks.filter(task => task.status === 'In Progress').length;
    this.done = this.filteredTasks.filter(task => task.status === 'Completed').length;
    this.statusCounts.emit({
      notStarted: this.notStarted,
      inProgress: this.inProgress,
      done: this.done
    });
  }

  openNewTaskPage() {
    this.router.navigate(['/projects', this.projectId, 'tasks', 'newtask']);
  }

  openEditTaskPage(task: Task) {
    this.router.navigate(['/projects', task.projectId, 'tasks', 'newtask', task.id]);
  }

  updateTask(task: Task) {
    this.projectService.updateTask(task.projectId, task).subscribe(updatedTask => {
      if (updatedTask) {
        console.log(`Task updated successfully:`, updatedTask);
      } else {
        console.error(`Failed to update task with ID ${task.id}.`);
      }
    });
  }
}
