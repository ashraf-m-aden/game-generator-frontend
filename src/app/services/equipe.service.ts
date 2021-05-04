import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  postOneTeam(team){
    return this.http.post(this.url + '/teams', team);
  }

  getAllTeam(){
    return this.http.get(this.url + '/teams');
  }

  getOneTeam(id){
    return this.http.get(this.url + '/teams/' + id);

  }

//////////////////////// tournois

  postOneTournoi(tournoi){
    return this.http.post(this.url + '/tournois', tournoi);
  }

  getAllTournoi(){
    return this.http.get(this.url + '/tournois');
  }

  getOneTournoi(id){
    return this.http.get(this.url + '/tournois/' + id);

  }

  removeOneTournoi(id){
    return this.http.delete(this.url + '/tournois/' + id);

  }



  /////////////////////////// games

  postOneCalendar(calendar){
    return this.http.post(this.url + '/games', calendar);
  }

  removeOneCalendar(id){
    return this.http.delete(this.url + '/games/' + id);

  }

  getOneCalendar(id){
    return this.http.get(this.url + '/games/' + id);

  }
}
