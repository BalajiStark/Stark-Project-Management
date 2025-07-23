import { Task } from "./task";

export class Project {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string; // e.g., 'Not Started', 'In Progress', 'Completed'
  priority: string; // e.g., 'Low', 'Medium', 'High'
  teamMembers: string[]; // Array of team member names or IDs
  tasks: Task[]; // Array of tasks associated with the project
  constructor(
    id: number,
    name: string,
    description: string,
    startDate: Date,
    endDate: Date,
    status: string,
    priority: string,
    teamMembers: string[],
    tasks: Task[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.priority = priority;
    this.teamMembers = teamMembers;
    this.tasks = tasks;
  }
}
