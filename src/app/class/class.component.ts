import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent {
  theme: any = [];
  id: any;

  constructor(private eventService: EventService, public dialog: MatDialog, private route:ActivatedRoute, private location: Location ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params["id"]
    this.loadEvent(this.id);
  }

  loadEvent(id: number) {
    this.eventService.getTheme(id).subscribe(response => {
      this.theme = response;
    });
  }

  abrirMenu(){
    console.log("abrirMenu");
  }

  goBack(): void {
    this.location.back();
  }
}
