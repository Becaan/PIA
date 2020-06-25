export interface Poljoprivrednik
{
    ime:string,
    prezime:string,
    korisnickoIme:string,
    lozinka:string,
    datumRodjenja:Date,
    mestoRodjenja:string,
    telefon:number,
    email:string
}

export interface Rasadnik
{
    _id:string,
    naziv:string,
    mesto:string,
    zasadjeneSadnice:number,
    slobodnaMesta:number,
    voda:number,
    temperatura:number
    sadnice:Sadnica[]
    colArray:any[];
    rowArray:any[];
}

export interface Sadnica
{
    naziv:string,
    proizvodjac:string
}