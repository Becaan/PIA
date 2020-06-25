import { Component, OnInit } from '@angular/core';
import { Preduzece } from 'src/models/preduzece';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-preduzece',
  templateUrl: './register-preduzece.component.html',
  styleUrls: ['./register-preduzece.component.css']
})
export class RegisterPreduzeceComponent implements OnInit {

  preduzece:Preduzece
  poruka:string
  lozinka:string
  lozinka2:string
  korisnickoIme:string
  email:string
  nazivPreduzeca: string;
  skraceniNazivPreduzeca: string;
  datumOsnivanjaPreduzeca: string;
  mestoPreduzeca: string;
  constructor(private authService: AuthService) { }
  
  ngOnInit(): void 
  {
    this.preduzece = {} as Preduzece
    this.poruka="";
  }

  registracija(){
    if(this.emptyField(this.nazivPreduzeca) || this.emptyField(this.skraceniNazivPreduzeca) || this.emptyField(this.lozinka)
    || this.emptyField(this.lozinka2) || this.emptyField(this.datumOsnivanjaPreduzeca)|| this.emptyField(this.mestoPreduzeca) || this.emptyField(this.email)){
      this.poruka = "Morate popuniti sva polja";
      return;
    }
    let lozinkaRegex = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,})$/;

    if(this.lozinka !== this.lozinka2)
    {
      this.poruka="Lozinke se ne poklapaju"
      return;
    }

   ///////// if(!lozinkaRegex.test(this.lozinka) || !lozinkaRegex.test(this.lozinka2))
    /////{
   //   this.poruka = "Lozinka je u losem formatu";
    //  return;
   // }

    this.poruka="";
    this.authService.createPreduzece(this.korisnickoIme, this.lozinka, this.email, this.nazivPreduzeca, this.skraceniNazivPreduzeca,
       this.datumOsnivanjaPreduzeca, this.mestoPreduzeca)
  }

  emptyField(field): boolean
  {
    return (field=="" || field==null);
  }
}
