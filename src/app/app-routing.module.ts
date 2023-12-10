import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ClassComponent } from './class/class.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AddCalendarComponent } from './calendar/add-calendar/add-calendar.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "calendario", component: CalendarComponent },
  { path: "calendario/adicionar", component: AddCalendarComponent },
  { path: "aula/:id", component: ClassComponent },
  { path: "meu-perfil", component: MyProfileComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
 }
