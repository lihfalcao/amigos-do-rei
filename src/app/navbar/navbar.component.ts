import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    logo:any;
    calendar:any;
    message:any;
    @Input() name :string | undefined;
    @Input() actualPage :string | undefined;

    constructor( private router: Router) { }

    ngOnInit(): void {
      this.logo = '../../assets/images/logo-navbar.png';
      this.calendar = '../../assets/images/calendar.png';
      this.message = '../../assets/images/message.png';
    }

    logout(){
      if(confirm('Deseja realmente deslogar?')){
          this.router.navigate(["/login"]);
      };
    }
  
}
