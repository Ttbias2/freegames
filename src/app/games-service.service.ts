import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { games } from './common/games';
import { game } from './common/game';


@Injectable({
  providedIn: 'root'
})
export class GamesServiceService {

  baseUrl: string = "https://free-to-play-games-database.p.rapidapi.com/api/";
  platform: string = "all";

  private apiKey = '0e6b807de5msh6024f60e1104cc1p1f25c9jsn528e61b93015';
  private apiHost = 'free-to-play-games-database.p.rapidapi.com';

  private games = new BehaviorSubject<games[]>([]);
  games$ = this.games.asObservable();

  private popularGames = new BehaviorSubject<games[]>([]);
  popularGames$ = this.popularGames.asObservable();

  private game = new BehaviorSubject<game | null>(null);
  game$ = this.game.asObservable();

  private genre = new BehaviorSubject<string>("");
  genre$ = this.genre.asObservable();

  constructor(private httpclient: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'x-rapidapi-key': this.apiKey,
      'x-rapidapi-host': this.apiHost,
    });
  }

  getGames() {
    const headers = this.getHeaders();

    this.httpclient.get<games[]>(`${this.baseUrl}games?platform=${this.platform}&sort-by=relevance`, { headers }).subscribe(result => {
      this.games.next(result);
    })
  }

  getPopularGames() {
    const headers = this.getHeaders();

    this.httpclient.get<games[]>(`${this.baseUrl}games?sort-by=popularity`, { headers }).subscribe(result => {
      this.popularGames.next(result.slice(0, 10));
    })
  }

  getGame(id: number) {
    this.game.next(null)

    const headers = this.getHeaders();

    this.httpclient.get<game>(`${this.baseUrl}game?id=${id}}`, { headers }).subscribe(result => {
      this.game.next(result);
    })
  }

  filter(platform: string) {
    
      const headers = this.getHeaders();
      this.platform = platform;
  
      console.log(this.genre.value)

      if(this.genre.value==""){
        this.getGames();
      }
      else{
        this.httpclient.get<games[]>(`${this.baseUrl}games?platform=${this.platform}&category=${this.genre.value}&sort-by=relevance`, { headers }).subscribe(result => {
          this.games.next(result);
        })
      }
  
  }

  changeGenre(genre:string){
    this.genre.next(genre);
  }
}
