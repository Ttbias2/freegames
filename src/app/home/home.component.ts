import { Component, OnInit } from '@angular/core';
import { GamesServiceService } from '../games-service.service';
import { games } from '../common/games';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  games: games[] = [];
  popularGames: games[] = [];
  position: number = 0;
  genre:string = "All genres"
  genres: string[] = [
    'mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social',
    'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel',
    'zombie', 'turn-based', 'top-down',
    'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath',
    'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime',
    'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military',
    'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts'
  ];

  constructor(private gameservice: GamesServiceService) { }

  ngOnInit(): void {

    this.gameservice.getGames();

    this.gameservice.getPopularGames();

    this.gameservice.games$.subscribe(gamesList => {
      this.games = gamesList;
    });

    this.gameservice.popularGames$.subscribe(gamesList => {
      this.popularGames = gamesList;

      if (this.popularGames.length < 11) {
        const firstClone = { ...this.popularGames[0] };
        const lastClone = { ...this.popularGames[this.popularGames.length - 1] };
        this.popularGames.unshift(lastClone);
        this.popularGames.push(firstClone);
      }
    });
  }

  nextPosition() {
    const carousel = document.getElementById('carrouselElements');
    if (carousel) {
      this.position++;
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(-${this.position * 816}px)`;

      if (this.position === this.popularGames.length - 1) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          this.position = 1;
          carousel.style.transform = `translateX(-${this.position * 816}px)`;
        }, 500);
      }
    }
  }

  previousPosition() {
    const carousel = document.getElementById('carrouselElements');
    if (carousel) {
      this.position--;
      carousel.style.transition = 'transform 0.5s ease';
      carousel.style.transform = `translateX(-${this.position * 816}px)`;

      if (this.position === 0) {
        setTimeout(() => {
          carousel.style.transition = 'none';
          this.position = this.popularGames.length - 2;
          carousel.style.transform = `translateX(-${this.position * 816}px)`;
        }, 500);
      }
    }
  }

  searchGame(id: number) {
    this.scrollToTop()
    this.gameservice.getGame(id);
  }

  filter(genre: string) {
    const platformR = document.querySelector('input[name="platform"]:checked') as HTMLInputElement | null;
    const platform: string = platformR ? platformR.value : "all";

    this.genre=genre;

    if (genre != "") {
      this.gameservice.changeGenre(genre);
    }

    this.gameservice.filter(platform)
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  cleanFilt(){
    const defaultRadio = document.querySelector('input[name="platform"][value="all"]') as HTMLInputElement | null;
    if (defaultRadio) {
      defaultRadio.checked = true;
    }

    this.genre="All genres";

    this.gameservice.changeGenre("");
    this.gameservice.filter("all");
  }
}
