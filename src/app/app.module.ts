import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TaskslistComponent } from './components/taskslist/taskslist.component';
import { RouterModule, Routes } from '@angular/router';
import { ProjectoverviewComponent } from './components/projectoverview/projectoverview.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewprojectComponent } from './components/newproject/newproject.component';
import { NewtaskComponent } from './components/newtask/newtask.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DateInputFormatPipe } from './shared/pipes/date-input-format.pipe';
import { DatePipe } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects/:id/tasks', component: ProjectoverviewComponent },
      { path: 'newproject', component: NewprojectComponent },
      { path: 'projects/:id/tasks/newtask/:taskid', component: NewtaskComponent },
      { path: 'projects/:id/tasks/newtask', component: NewtaskComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TaskslistComponent,
    ProjectoverviewComponent,
    NewprojectComponent,
    NewtaskComponent,
    NavbarComponent,
    DateInputFormatPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)

  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
