import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authServis: AuthService) {}

  ngOnInit(): void 
  {
    this.authServis.autoAuthUser();
  }
  title = 'Projekat';
}
