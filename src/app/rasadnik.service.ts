import { Injectable } from '@angular/core';
import { Rasadnik, Sadnica } from 'src/models/poljoprivrednik';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RasadnikService {

  constructor(private http:HttpClient) { }

  rasadnikUpdated = new Subject<Rasadnik[]>();
  rasadnici:Rasadnik[]=[];
  noveSadnice :Sadnica[]
  sadnica:Sadnica= {} as Sadnica;
  colArray = [];
  rowArray = [];

  getRasadnici()
  {
    this.http.get<{message:string, rasadnici:Rasadnik[]}> ('http://localhost:3000/rasadnici').subscribe(data =>
    {
      this.rasadnici= data.rasadnici;
      this.rasadnikUpdated.next([...this.rasadnici]);
    });
  }

  getRasadnikUpdateListener()
  {
    return this.rasadnikUpdated.asObservable();
  }

  putRasadnik(naziv:string, mesto:string, duzina:number, sirina:number, voda:number, temperatura:number)
  {
    const sadnice:Sadnica[] = Array();
    for(let i = 1; i<=duzina*sirina; i++)
    {
      sadnice.push(this.sadnica);
    }

    this.colArray = [];
    this.rowArray = [];
    for(let i = 0; i<sirina; i++){
      this.colArray.push(i);
    }
    for(let i = 0; i<duzina; i++){
      this.rowArray.push(i);
    }

    const noviRasadnik:Rasadnik ={_id:null, naziv:naziv, mesto:mesto, zasadjeneSadnice:0, slobodnaMesta:duzina*sirina,
      voda:voda, temperatura:temperatura, sadnice:sadnice, colArray:this.colArray, rowArray:this.rowArray } ;
      this.http.post<{message:string, rasadnikId:string}>('http://localhost:3000/rasadnici', noviRasadnik).subscribe(response =>{
        const id = response.rasadnikId;
        noviRasadnik._id = id;     
        this.rasadnici.push(noviRasadnik);
        this.rasadnikUpdated.next([...this.rasadnici]);  
      });   
  }

  deleteRasadnik(rasadnikId:string)
  {
    this.http.delete('http://localhost:3000/rasadnici/' + rasadnikId)
    .subscribe(() =>{
      const updatedRasadnici = this.rasadnici.filter(rasadnik => rasadnik._id != rasadnikId);
      this.rasadnici = updatedRasadnici;
      this.rasadnikUpdated.next([...this.rasadnici]);
    });
  }
}
