import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private ruter:Router) { }

  tip:number // 1-Poljoprivrednik, 2-Preduzece
  poruka:string

  odrediTip(num:number)
  {
    this.tip=num;
    if(this.tip == 1)
    {
      this.ruter.navigate(["/register/poljoprivrednik"])
    }
    if(this.tip == 2)
    {
      this.ruter.navigate(["/register/preduzece"])
    }
  }

  ngOnInit(): void {
    this.tip = 0;
  }

}
