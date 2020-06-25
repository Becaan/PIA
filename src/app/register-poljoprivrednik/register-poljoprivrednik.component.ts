import { Component, OnInit } from '@angular/core';
import { Poljoprivrednik } from 'src/models/poljoprivrednik';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-poljoprivrednik',
  templateUrl: './register-poljoprivrednik.component.html',
  styleUrls: ['./register-poljoprivrednik.component.css']
})
export class RegisterPoljoprivrednikComponent implements OnInit {

  constructor(private authService: AuthService) { }

  poljoprivrednik:Poljoprivrednik
  poruka:string
  lozinka:string
  lozinka2:string
  ime:string
  prezime:string
  korisnickoIme:string
  datumRodjenja:string
  mestoRodjenja:string
  kontakt:number
  email:string

  ngOnInit(): void 
  {
    this.poljoprivrednik = {} as Poljoprivrednik
    this.poruka="";
  }

  registracija(){
    let date = this.datumRodjenja.split("-");
    if(this.emptyField(this.ime) || this.emptyField(this.prezime) || this.emptyField(this.korisnickoIme)
    || this.emptyField(this.lozinka) || this.emptyField(this.lozinka2) || this.emptyField(this.datumRodjenja)
    || this.emptyField(this.mestoRodjenja) || this.emptyField(this.kontakt) || this.emptyField(this.email)){
      this.poruka = "Morate popuniti sva polja";
      return;
    }

    if(this.lozinka !== this.lozinka2)
    {
      this.poruka="Lozinke se ne poklapaju"
      return;
    }

    ///////////////////////let lozinkaRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/; ////////// LOS REGEX
    //if(!lozinkaRegex.test(this.lozinka) || !lozinkaRegex.test(this.lozinka2))
    //{
     // this.poruka = "Lozinka je u losem formatu";
    ///  return;
   /// }
    this.poruka="";
    this.authService.createPoljoprivrednik(this.korisnickoIme, this.lozinka, this.email, this.ime, this.prezime, this.datumRodjenja, this.mestoRodjenja, this.kontakt)
  }

  emptyField(field): boolean
  {
    return (field=="" || field==null);
  }
}
