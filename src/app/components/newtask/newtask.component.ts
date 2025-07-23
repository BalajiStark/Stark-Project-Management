import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../shared/services/project.service';
import { DateInputFormatPipe } from '../../shared/pipes/date-input-format.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-newtask',
  templateUrl: './newtask.component.html',
  styleUrl: './newtask.component.css'
})
export class NewtaskComponent implements OnInit {

  task!: Task;
  taskId!: string;
  projectId!: string;
  isEditMode = false;
  assignees: string[] = [];


  constructor(private route: ActivatedRoute, private projectService: ProjectService, private router: Router, private datePipe: DatePipe) {
    this.projectService.getAssignees().subscribe(assignees => {
      if (assignees && assignees.length > 0) {
        this.assignees = assignees;
      }
    });
  }

  ngOnInit(): void {
    this.task = new Task(0, '', '', '', new Date().toDateString(), new Date().toDateString(), 'Not Started', 'Low', 0);
    this.taskId = this.route.snapshot.paramMap.get('taskid') || '';
    this.projectId = this.route.snapshot.paramMap.get('id') || '';

    if (this.taskId) {
      this.projectService.getTasksByProjectId(parseInt(this.projectId), parseInt(this.taskId)).subscribe(task => {
        if (task) {
          this.task = task;
          this.isEditMode = true;
          this.task.endDate = this.datePipe.transform(this.task.endDate, 'yyyy-MM-dd') ?? '';
          this.task.startDate = this.datePipe.transform(this.task.startDate, 'yyyy-MM-dd') ?? '';
        } else {         
          this.router.navigate(['/projects', this.projectId, 'tasks']);
        }
      });
    } else {
      this.isEditMode = false;
      this.task.projectId = parseInt(this.projectId, 10);
    }
  }

  navigateToProjectDetails(): void {
    this.router.navigate(['/projects', this.projectId, 'tasks']);
  }

  submitForm(form: any) {
    if (form.valid) {

      var projectData = new Task(this.task.id, this.task.title, this.task.description, this.task.assignedTo, new Date(this.task.startDate).toDateString(),
        new Date(this.task.endDate).toDateString(), this.task.status, this.task.priority, parseInt(this.projectId));

      if (this.isEditMode) {
        this.projectService.updateTask(parseInt(this.projectId), projectData).subscribe(response => {
          window.alert('Task updated successfully!'); 
          this.navigateToProjectDetails(); 
        });
      } else {
        this.projectService.addTask(parseInt(this.projectId), projectData).subscribe(response => {
          window.alert('Task created successfully!'); 
          this.navigateToProjectDetails();
        });
      }
    }
  }
}
