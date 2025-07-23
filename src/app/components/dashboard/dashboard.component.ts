import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../shared/services/project.service';
import { Project } from '../../shared/models/project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  projectsList: Project[] = [];

  constructor(private projectService: ProjectService, private route: Router) {
    
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projectsList = data;
    });
  }

  getTaskStatusCount(project: Project, status: string): number {
    return project.tasks.filter(task => task.status === status).length;
  }

  navigateToProjectDetails(projectId: number): void {
    console.log(`Navigating to details of project with ID: ${projectId}`);
    this.route.navigate(['/projects', projectId, 'tasks']);
  }

  navigateToNewProject(): void {
    console.log('Navigating to create a new project');
    this.route.navigate(['/newproject']);
  }

}
