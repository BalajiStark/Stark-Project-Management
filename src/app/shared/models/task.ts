export class Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string; // Name or ID of the person assigned to the task
  startDate: string = '';
  endDate: string ='';
  status: string; // e.g., 'Not Started', 'In Progress', 'Completed'
  priority: string; // e.g., 'Low', 'Medium', 'High'
  projectId: number; // ID of the project this task belongs to
  constructor(
    id: number,
    title: string,
    description: string,
    assignedTo: string,
    startDate: string,
    endDate: string,
    status: string,
    priority: string,
    projectId: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.assignedTo = assignedTo;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.priority = priority;
    this.projectId = projectId;
  }
}
