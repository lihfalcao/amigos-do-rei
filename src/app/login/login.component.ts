import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any = FormGroup;
  wrong: boolean = false;
  logo:any = "";
  kids:any = "";
  showPassword = false;
  passwordInputType = 'password';
  passwordIcon = 'visibility';

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,


     ) { }

  ngOnInit(): void {
      this.logo = '../../assets/images/logo-redondo.png';
      this.kids = '../../assets/images/kids.png';


      this.loginForm = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.minLength(5)]),
        password: new FormControl('', [Validators.required]),
    });
  }


  enter(){
    this.router.navigate(["/"]);
  }

  register(){
    this.router.navigate(["/registrar"]);
  }

  toggleVisibility() {
    const currentIcon = this.showPassword ? 'visibility' : 'visibility_off';
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
    this.passwordIcon = currentIcon;
  }
  

  submit(data:any) {
    this.wrong = false;
    let exist = false;
    this.userService.users()
    .subscribe(users =>{
      users.forEach(user => {
        if(user.username == data.username){
            exist = true;
            this.wrong = false;
            this.loginService.login(data);
            this.router.navigate(["/"]);
        }
      });
      if(!exist){
        this.wrong = true;
      }

    })
    
  }
}
