import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ruter:Router, private authService: AuthService) { }

  korisnickoIme:string
  lozinka:string
  tip:number

  ngOnInit(): void {
  }

  potvrdi()
  {//////////////////////////////////////Treba spojiti sve u jedan bez checkboxova
    if(this.tip == 1)
    {
      this.authService.loginPoljoprivrednik(this.korisnickoIme, this.lozinka);
    }
    if(this.tip == 2)
    {
      this.authService.loginPreduzece(this.korisnickoIme, this.lozinka);
    }
    
  }

}
