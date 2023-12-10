// home.component.ts
import { Component, OnInit } from "@angular/core";
import { EventService } from "../services/event.service";
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  event: any = [];

  constructor(private eventService: EventService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEventsForLoggedInUser().subscribe(events => {
      this.event = events[0];
      console.log(this.event);
    });
  }

  abrirMenu(){
    console.log("abrirMenu");
  }
}
