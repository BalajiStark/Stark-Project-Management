import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../shared/models/project';
import { ProjectService } from '../../shared/services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newproject',
  templateUrl: './newproject.component.html',
  styleUrl: './newproject.component.css'
})
export class NewprojectComponent {

  projectForm: FormGroup;

  constructor(private fb: FormBuilder, private projectService: ProjectService, private route: Router) {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      teamMembers: this.fb.array([this.fb.control('')])
    });
  }

  get teamMembers(): FormArray {
    return this.projectForm.get('teamMembers') as FormArray;
  }

  addTeamMember() {
    this.teamMembers.push(this.fb.control(''));
  }

  removeTeamMember(index: number) {
    this.teamMembers.removeAt(index);
  }

  get f() {
    return this.projectForm.controls;
  }

  submitForm() {
    if (this.projectForm.valid) {

      var formData = this.projectForm.value;
      const members: string[] = this.teamMembers.value; 
      var projectData = new Project(0, formData.name, formData.description, new Date(formData.startDate), new Date(formData.endDate), 'Not Started', 'Low', members, []);
      
      this.projectService.addProject(projectData).subscribe(response => {      
        window.alert('Project created successfully!'); 
        this.route.navigate(['dashboard']); 
      });
    }
  }
}
