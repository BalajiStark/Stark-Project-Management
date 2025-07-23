import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Project } from '../models/project';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectsList: Project[] = [];
  assignees: string[] = [];

  constructor() {
    var project = new Project(1, 'Project Alpha', 'A task management system to streamline team workflows and productivity tracking', new Date('2025-01-01'), new Date('2025-06-01'), 'Not Started', 'Low', [], []);
    var project2 = new Project(2, 'Project Beta', 'A collaborative document editing platform with real-time sync and version control', new Date('2025-02-01'), new Date('2025-07-01'), 'In Progress', 'Medium', [], []);
    var project3 = new Project(3, 'Project Gamma', 'A client support ticketing system for managing customer queries and service requests', new Date('2025-03-01'), new Date('2025-08-01'), 'Completed', 'High', [], []);
    var project4 = new Project(4, 'Project Delta', 'A financial dashboard for visualizing expenses, revenue, and budget analytics', new Date('2025-04-01'), new Date('2025-09-01'), 'Not Started', 'Low', [], []);
    var project5 = new Project(5, 'Project Epsilon', 'An HR portal for employee onboarding, leave tracking, and performance reviews', new Date('2025-05-01'), new Date('2025-10-01'), 'In Progress', 'Medium', [], []);
    var project6 = new Project(6, 'Project Zeta', 'A project scheduling tool for assigning resources and tracking deadlines in Gantt view', new Date('2025-06-01'), new Date('2025-11-01'), 'Completed', 'High', [], []);
    var task1 = new Task(1, 'Task 1', 'Description for task 1', 'Alice', new Date('2025-01-02').toDateString(), new Date('2025-01-10').toDateString(), 'Not Started', 'Low', 1);
    var task2 = new Task(2, 'Task 2', 'Description for task 2', 'Bob', new Date('2025-02-02').toDateString(), new Date('2025-02-10').toDateString(), 'In Progress', 'Medium', 1);
    var task3 = new Task(3, 'Task 3', 'Description for task 3', 'Charlie', new Date('2025-03-02').toDateString(), new Date('2025-03-10').toDateString(), 'Completed', 'High', 1);
    var task4 = new Task(4, 'Task 4', 'Description for task 4', 'David', new Date('2025-04-02').toDateString(), new Date('2025-04-10').toDateString(), 'Not Started', 'Low', 2);
    var task5 = new Task(5, 'Task 5', 'Description for task 5', 'Eve', new Date('2025-05-02').toDateString(), new Date('2025-05-10').toDateString(), 'In Progress', 'Medium', 2);
    var task6 = new Task(6, 'Task 6', 'Description for task 6', 'Frank', new Date('2025-06-02').toDateString(), new Date('2025-06-10').toDateString(), 'Completed', 'High', 2);
    var task7 = new Task(7, 'Task 7', 'Description for task 7', 'Grace', new Date('2025-07-02').toDateString(), new Date('2025-07-10').toDateString(), 'Not Started', 'Low', 3);
    var task8 = new Task(8, 'Task 8', 'Description for task 8', 'Heidi', new Date('2025-08-02').toDateString(), new Date('2025-08-10').toDateString(), 'In Progress', 'Medium', 3);
    var task9 = new Task(9, 'Task 9', 'Description for task 9', 'Ivan', new Date('2025-09-02').toDateString(), new Date('2025-09-10').toDateString(), 'Completed', 'High', 3);
    var task10 = new Task(10, 'Task 10', 'Description for task 10', 'Judy', new Date('2025-10-02').toDateString(), new Date('2025-10-10').toDateString(), 'Not Started', 'Low', 4);
    var task11 = new Task(11, 'Task 11', 'Description for task 11', 'Karl', new Date('2025-11-02').toDateString(), new Date('2025-11-10').toDateString(), 'In Progress', 'Medium', 4);
    var task12 = new Task(12, 'Task 12', 'Description for task 12', 'Leo', new Date('2025-12-02').toDateString(), new Date('2025-12-10').toDateString(), 'Completed', 'High', 4);
    var task13 = new Task(13, 'Task 13', 'Description for task 13', 'Mia', new Date('2025-01-03').toDateString(), new Date('2025-01-11').toDateString(), 'Not Started', 'Low', 5);
    var task14 = new Task(14, 'Task 14', 'Description for task 14', 'Nina', new Date('2025-02-03').toDateString(), new Date('2025-02-11').toDateString(), 'In Progress', 'Medium', 5);
    var task15 = new Task(15, 'Task 15', 'Description for task 15', 'Oscar', new Date('2025-03-03').toDateString(), new Date('2025-03-11').toDateString(), 'Completed', 'High', 5);
    var task16 = new Task(16, 'Task 16', 'Description for task 16', 'Paul', new Date('2025-04-03').toDateString(), new Date('2025-04-11').toDateString(), 'Not Started', 'Low', 6);
    var task17 = new Task(17, 'Task 17', 'Description for task 17', 'Quinn', new Date('2025-05-03').toDateString(), new Date('2025-05-11').toDateString(), 'Completed', 'Medium', 6);
    var task18 = new Task(18, 'Task 18', 'Description for task 18', 'Ray', new Date('2025-06-03').toDateString(), new Date('2025-06-11').toDateString(), 'Completed', 'High', 6);

    project.tasks.push(task1, task2, task3);
    project2.tasks.push(task4, task5, task6);
    project3.tasks.push(task7, task8, task9);
    project4.tasks.push(task10, task11, task12);
    project5.tasks.push(task13, task14, task15);
    project6.tasks.push(task16, task17, task18);
    this.projectsList = [];
    this.projectsList.push(project);
    this.projectsList.push(project2);
    this.projectsList.push(project3);
    this.projectsList.push(project4);
    this.projectsList.push(project5);
    this.projectsList.push(project6);

    this.assignees = ['',
      'Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank',
      'Grace', 'Heidi', 'Ivan', 'Judy', 'Karl', 'Leo',
      'Mia', 'Nina', 'Oscar', 'Paul', 'Quinn', 'Ray'];
  }

  getProjects(): Observable<Project[]> {
    return of(this.projectsList);
  }

  getProjectById(id: number): Observable<Project | undefined> {
    const project = this.projectsList.find(p => p.id === id);
    if (project) {
      return of(project);
    } else {
      return of(undefined);
    }
  }

  getAssignees(): Observable<string[]> {
    return of(this.assignees);
  }

  addProject(project: Project): Observable<Project> {
    project.id = this.projectsList.length + 1; // Assign a new ID based on current projects length
    this.projectsList.push(project);

    if (project.teamMembers.length !== 0) {
      this.assignees.push(...project.teamMembers.filter(member => !this.assignees.includes(member)));
    }
    return of(project);
  }

  addTask(projectId: number, task: Task): Observable<Task | null> {
    const project = this.projectsList.find(p => p.id === projectId);
    if (project) {
      task.id = project.tasks.length + 1; // Assign a new ID based on current tasks length
      project.tasks.push(task);
      return of(task);
    }
    return of(null); // 🔁 Add this to handle project not found
  }

  getTasksByProjectId(projectId: number, taskId: number): Observable<Task | null> {
    const project = this.projectsList.find(p => p.id === projectId);

    if (project) {
      const task = project.tasks.find(t => t.id === taskId);
      return of(task ?? null);
    }

    return of(null); // 🔁 Add this to handle project not found
  }

  updateTask(projectId: number, task: Task): Observable<Task | null> {
    const project = this.projectsList.find(p => p.id === projectId);
    if (project) {
      const existingTaskIndex = project.tasks.findIndex(t => t.id === task.id);
      if (existingTaskIndex !== -1) {
        project.tasks[existingTaskIndex] = task;
        return of(task);
      }
    }
    return of(null); // 🔁 Add this to handle task not found
  }

}
