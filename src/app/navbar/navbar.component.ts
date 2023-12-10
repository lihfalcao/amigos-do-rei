import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    logo:any;
    calendar:any;
    message:any;
    name: any;
    @Input() actualPage :string | undefined;
    logged: boolean = false;
    data:any;

    constructor(private loginService: LoginService, private router: Router) { }

    ngOnInit(): void {
      this.logo = '../../assets/images/logo-navbar.png';
      this.calendar = '../../assets/images/calendar.png';
      this.message = '../../assets/images/message.png';
      this.logged = this.isLoggedIn();

    }
  
    isLoggedIn(): boolean{
      if(this.loginService.user){
         this.data = this.loginService.getUser()
       } else {
        this.router.navigate(["/login"]);
       }
      return this.loginService.isLoggedIn()
    }
  
    logout(){
      if(confirm('Deseja realmente deslogar?')){
        this.logged = false;
        this.loginService.logout()
        this.router.navigate(["/login"]);
      };
    }

    redirecionarParaWhatsApp(): void {
      const groupLink = 'https://chat.whatsapp.com/Cwj5YHfj0chH01n6ysuIzp';  
      
      window.open(groupLink, '_blank');
    }


    verPerfil(){
      this.router.navigate(["/meu-perfil"]);
    }
     
  
}
