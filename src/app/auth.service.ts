import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthDataPoljoprivrednik, AuthDataPreduzece, AuthDataAdmin } from 'src/models/auth-data';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http :HttpClient, private ruter: Router) { }

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  getToken()
  {
    return this.token;
  }

  getIsAuth()
  {
    return this.isAuthenticated;
  }

  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }

  createPoljoprivrednik(korisnickoIme:string, lozinka:string, email:string, ime:string, prezime:string, datumRodjenja:string, mestoRodjenja:string, kontakt:number)
  {
    const authDataPoljoprivrednik: AuthDataPoljoprivrednik = {korisnickoIme: korisnickoIme, lozinka: lozinka, email:email, ime: ime,
       prezime:prezime, odobren: 0, datumRodjenja:datumRodjenja, mestoRodjenja: mestoRodjenja, kontakt:kontakt};

    this.http.post('http://localhost:3000/user/signup/poljoprivrednik', authDataPoljoprivrednik)
      .subscribe(response =>{
        console.log(response);
      });
  }

  createPreduzece(korisnickoIme:string, lozinka:string, email:string, nazivPreduzeca:string, skraceniNazivPreduzeca:string, datumOsnivanjaPreduzeca:string, mestoPreduzeca:string)
  {
    const authDataPreduzece: AuthDataPreduzece = {korisnickoIme: korisnickoIme, lozinka: lozinka, email:email, odobren: 0, nazivPreduzeca: nazivPreduzeca,
       skraceniNazivPreduzeca: skraceniNazivPreduzeca, datumOsnivanjaPreduzeca: datumOsnivanjaPreduzeca, mestoPreduzeca: mestoPreduzeca};

    this.http.post('http://localhost:3000/user/signup/preduzece', authDataPreduzece)
    .subscribe(response =>{
      console.log(response);
    });
  }

  loginPoljoprivrednik(korisnickoIme:string, lozinka:string)
  {
    const authDataPoljoprivrednik: AuthDataPoljoprivrednik = {korisnickoIme: korisnickoIme, lozinka: lozinka, email:null, ime: null, prezime:null, odobren: 0, datumRodjenja:null,
      mestoRodjenja: null, kontakt:null};

    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/user/login/poljoprivrednik', authDataPoljoprivrednik)
      .subscribe(response =>{
        const token = response.token;
        this.token = token;
        if(token)
        {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.ruter.navigate(['/poljoprivrednik']);//promenitii
        }
      });
  }

  loginPreduzece(korisnickoIme:string, lozinka:string)
  {
    const authDataPreduzece: AuthDataPreduzece = {korisnickoIme: korisnickoIme, lozinka: lozinka, email:null, odobren: 0, 
      nazivPreduzeca:null, skraceniNazivPreduzeca: null, datumOsnivanjaPreduzeca:null, mestoPreduzeca:null};

    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/user/login/preduzece', authDataPreduzece)
      .subscribe(response =>{
        const token = response.token;
        this.token = token;
        if(token)
        {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration*1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.ruter.navigate(['/preduzece']);
        }
      });
  }

  loginAdmin(korisnickoIme:string, lozinka:string)
  {
    const authDataAdmin: AuthDataAdmin = {korisnickoIme: korisnickoIme, lozinka: lozinka };

    this.http.post<{token: string, expiresIn: number}>('http://localhost:3000/user/login/admin', authDataAdmin)
      .subscribe(response =>{
        const token = response.token;
        this.token = token;
        if(token)
        {
          const expiresInDuration = response.expiresIn;
          this.tokenTimer = setTimeout(() => {
            this.logout();
          }, expiresInDuration*1000);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.ruter.navigate(['/admin']);
        }
      });
  }

  private setAuthTimer(duration: number)
  {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration*1000);
  }

  saveAuthData(token: string, expiresInDate: Date)
  {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expiresInDate.toISOString());
  }

  clearAuthData()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  getAuthData()
  {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");

    if(!token || !expirationDate)
      return;

    return{
      token:token,
      expirationDate: new Date(expirationDate)
    }
  }

  autoAuthUser()
  {
    const authInformation = this.getAuthData();
    if(!authInformation)
      return;
      
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout()
  {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.ruter.navigate(['']);
  }
}