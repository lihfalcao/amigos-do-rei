import { Component } from '@angular/core';
import { CalendarOptions, EventClickArg } from 'fullcalendar';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    locale: ptBrLocale,
    events: []
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.calendarService.getEventsWithProfessors().subscribe((eventsWithProfessors) => {
      this.calendarOptions.events = eventsWithProfessors.map((event) => ({
        id: event.id,
        title: `${event.className} - ${event.professorName}`,
        date: event.date,
        color: event.classColor
      }));
    });
  }
}
