import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/app/services/event.service';
import { ProfessorService } from 'src/app/services/professor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { format } from 'date-fns';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-calendar',
  templateUrl: './add-calendar.component.html',
  styleUrls: ['./add-calendar.component.css']
})
export class AddCalendarComponent {
  calendarForm: any = FormGroup;
  classes: any = [];
  themes: any = [];
  professors: any = [];
  showThemes: boolean = false;


  constructor(private eventService: EventService, private professorService: ProfessorService, private snackBar: MatSnackBar, private router: Router ) {}

  ngOnInit(): void {
    this.calendarForm = new FormGroup({
      date: new FormControl('', Validators.required),
      class: new FormControl('', Validators.required),
      theme: new FormControl('', Validators.required),
      professor: new FormControl('', Validators.required),
      themeName: new FormControl(''),
      content: new FormControl(''),
      resume: new FormControl(''),
    });

    this.getClasses();
    this.getThemes();
    this.getProfessors();

    this.calendarForm.get('theme').valueChanges.subscribe((value: any) => {
        this.showThemes = value == 'novo' ? true : false;
    });
  }

  getClasses(){
    this.eventService.getClasses().subscribe(response => {
      this.classes = response;
    });
  }

  getThemes(){
    this.eventService.getThemes().subscribe(response => {
      this.themes = response;
    });
  }

  getProfessors(){
    this.professorService.getProfessors().subscribe(response => {
      this.professors = response;
    });
  }
  submit(data:any) {
    if(this.calendarForm.get('theme').value == 'novo'){
      let data = {
        "themeName" : this.calendarForm.get('themeName').value,
        "content" : this.calendarForm.get('content').value,
        "resume" : this.calendarForm.get('resume').value
      }
      this.eventService.saveTheme(data).subscribe((response: any) => {
        const dateValue = this.calendarForm.get('date').value;
        let dataEvent = {
          "date": format(new Date(dateValue), 'yyyy-MM-dd'),
          "professorId" : this.calendarForm.get('professor').value,
          "classId" : this.calendarForm.get('class').value,
          "themeId" : response.id
        }
        this.eventService.saveEvent(dataEvent).subscribe((calendar: any) => {
            this.snackBar.open('Evento criado com sucesso!', 'Fechar', {
              duration: 3000, 
              panelClass: ['success-snackbar'], 
            });
            this.router.navigate(["/calendario"]);
        }, (errors: any) => {
            this.snackBar.open('Algo deu errado!', 'Fechar', {
              duration: 3000,
              panelClass: ['error-snackbar'],
          });
        });
      });
    } else {
      const dateValue = this.calendarForm.get('date').value;
      let dataEvent = {
        "date": format(new Date(dateValue), 'yyyy-MM-dd') ,
        "professorId" : this.calendarForm.get('professor').value,
        "classId" : this.calendarForm.get('class').value,
        "themeId" : this.calendarForm.get('theme').value
      }
      this.eventService.saveEvent(dataEvent).subscribe((calendar: any) => {
          this.snackBar.open('Evento criado com sucesso!', 'Fechar', {
            duration: 3000, 
            panelClass: ['success-snackbar'], 
          });
          this.router.navigate(["/calendario"]);
      }, (errors: any) => {
          this.snackBar.open('Algo deu errado!', 'Fechar', {
            duration: 3000,
            panelClass: ['error-snackbar'],
        });
      });
    }
  }
}
