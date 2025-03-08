import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: false,
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent implements OnInit {
  percentage: number = 0;
  correctAnswers: number = 0;
  errors: number = 0;
  game: number = 0;
  gameAns: string | null = null;
  gameName: string = "";

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.extractParams();
    this.setGameName();
  }

  extractParams(): void {
    this.percentage = Number(this.route.snapshot.queryParamMap.get('percentage')) || 0;
    this.correctAnswers = Number(this.route.snapshot.queryParamMap.get('correctAnswers')) || 0;
    this.errors = Number(this.route.snapshot.queryParamMap.get('errors')) || 0;
    this.game = Number(this.route.snapshot.queryParamMap.get('game')) || 0;
    this.gameAns = this.route.snapshot.queryParamMap.get('gameAns');
  }

  setGameName(): void {
    if (this.game === 1) {
      this.gameName = "Una Palabra";
    } else if(this.game === 2) {
      this.gameName = "Escoge la Correcta";
    }
    else if(this.game === 3) {
      this.gameName = "Verbos Irregulares";
    }
    else if(this.game === 4) {
      this.gameName = "Pareo";
    }
  }

  retry(): void {
    this.router.navigate([`/game-${this.game}`]);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }
}