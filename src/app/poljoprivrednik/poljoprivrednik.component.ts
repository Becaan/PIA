import { Component, OnInit, OnDestroy } from '@angular/core';
import { Rasadnik } from 'src/models/poljoprivrednik';
import { RasadnikService } from '../rasadnik.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-poljoprivrednik',
  templateUrl: './poljoprivrednik.component.html',
  styleUrls: ['./poljoprivrednik.component.css']
})
export class PoljoprivrednikComponent implements OnInit, OnDestroy {

  constructor(private servis : RasadnikService) { }
  ngOnDestroy(): void 
  {
    this.rasadnikSub.unsubscribe();
  }

  rasadnici:Rasadnik[] =[];
  rasadnikSub:Subscription;

  colArray = [];
  rowArray = [];

  ngOnInit(): void 
  {
    this.servis.getRasadnici();
    this.rasadnikSub = this.servis.getRasadnikUpdateListener().subscribe((rasadnici:Rasadnik[]) =>{
      console.log(rasadnici);
      this.rasadnici = rasadnici;
    });
  }

  obrisi(rasadnikId:string)
  {
    this.servis.deleteRasadnik(rasadnikId);
  }
  
}
