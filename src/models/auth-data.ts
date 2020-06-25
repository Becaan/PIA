export interface AuthDataPoljoprivrednik{
    korisnickoIme: String;
    lozinka: String;
    email: String;
    ime:String;
    odobren: number;
    prezime: String;
    datumRodjenja: String;
    mestoRodjenja :String;
    kontakt: number;
}

export interface AuthDataPreduzece{
    korisnickoIme: String;
    lozinka: String;
    email: String;
    odobren: number;
    nazivPreduzeca: String;
    skraceniNazivPreduzeca: String;
    datumOsnivanjaPreduzeca: String;
    mestoPreduzeca: String;
}

export interface AuthDataAdmin{
    korisnickoIme: String;
    lozinka: String;
}