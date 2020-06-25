import { Component, OnInit } from '@angular/core';
import { Rasadnik, Sadnica } from 'src/models/poljoprivrednik';
import { RasadnikService } from '../rasadnik.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dodaj-rasadnik',
  templateUrl: './dodaj-rasadnik.component.html',
  styleUrls: ['./dodaj-rasadnik.component.css']
})
export class DodajRasadnikComponent implements OnInit {

  constructor(private servis : RasadnikService) { }

  poruka:string
  naziv:string;
  mesto:string;
  duzina:number;
  sirina:number;
  slobodnaMesta:number;

  ngOnInit(): void 
  {
  }


  napraviRasadnik(form:NgForm)
  {
    if(form.invalid)
    {
      this.poruka="Popunite sva polja odgovarajucim podacima"
      return;
    }
    this.poruka=""

    this.servis.putRasadnik(this.naziv, this.mesto, this.duzina, this.sirina, 18, 200);
  }

}
