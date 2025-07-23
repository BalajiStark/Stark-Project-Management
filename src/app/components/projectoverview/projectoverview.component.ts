import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../shared/models/project';
import { ProjectService } from '../../shared/services/project.service';

@Component({
  selector: 'app-projectoverview',
  templateUrl: './projectoverview.component.html',
  styleUrl: './projectoverview.component.css'
})
export class ProjectoverviewComponent implements OnInit {

  projectId!: string;
  projectDetails!: Project;
  assignees: string[] = [];
  status: string[] = ['', 'Not Started', 'In Progress', 'Completed'];
  priorities: string[] = ['', 'Low', 'Medium', 'High'];
  sortingProperties: string[] = ['', 'Status', 'Priority', 'Assigned To'];
  selectedAssignee: string = '';
  selectedPriority: string = '';
  selectedStatus: string = '';
  selectedSort: string = '';
  statusCount = { notStarted: 0, inProgress: 0, done: 0 };

  constructor(private route: ActivatedRoute, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id')!;

    this.projectService.getProjectById(Number(this.projectId)).subscribe(project => {
      if (project) {
        this.projectDetails = project;
      }
    });

    this.projectService.getAssignees().subscribe(assignees => {
      if (assignees && assignees.length > 0) {
        this.assignees = assignees;
      }
    });
  }

  clearFilters() {
    this.selectedAssignee = '';
    this.selectedPriority = '';
    this.selectedStatus = '';
  }

  receiveCounts(data: { notStarted: number; inProgress: number; done: number }) {
    setTimeout(() => {
      this.statusCount = data;
    }, 0);
    console.log('Received from child:', data);
  }
}
