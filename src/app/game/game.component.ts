import { Component, OnInit } from '@angular/core';
import { GamesServiceService } from '../games-service.service';
import { game } from '../common/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent implements OnInit{

  game:game|null = null; 

  constructor(private gameService:GamesServiceService){}

  ngOnInit(): void {
    this.gameService.game$.subscribe(game=>{
      this.game = game;
    })
  }

  changeImage(newImage: string | undefined) {
    if (newImage) {
      const mainImage = document.querySelector('.principalImg') as HTMLImageElement;
      if (mainImage) {
        mainImage.src = newImage;
      }
    }
  }

}
