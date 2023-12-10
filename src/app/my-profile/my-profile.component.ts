import { Component } from '@angular/core';
import { ProfessorService } from '../services/professor.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {
  professor: any = [];
  events: any = [];


  constructor(private professorService: ProfessorService, private eventService: EventService) { }

  ngOnInit(): void {
    this.getProfessor();
  }


  getProfessor(){
    this.professorService.getProfessor().subscribe(professor => {
      this.professor = professor;
      this.getPassedEventsByProfessor(professor.id);
    });
  }

  getPassedEventsByProfessor(id: number){
    this.eventService.getPassedEventsByProfessor(id).subscribe(event => {
      this.events = event;
    });
  }

  abrirMenu(){
    console.log("abrirMenu");
  }
}
