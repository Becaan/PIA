import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authServis : AuthService) { }

  userIsAuthenticated=false;
  private authListenerSubs:Subscription;

  ngOnInit(): void 
  {
    this.userIsAuthenticated = this.authServis.getIsAuth();
    this.authListenerSubs = this.authServis
    .getAuthStatusListener()
    .subscribe(isAuthenticated =>{
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onLogout()
  {
  this.authServis.logout();
  }

  ngOnDestroy(): void 
  {
    this.authListenerSubs.unsubscribe();
  }

  

}
