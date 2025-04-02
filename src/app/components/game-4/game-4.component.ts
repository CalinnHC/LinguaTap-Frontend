import { Component } from '@angular/core';
import { WordService } from '../../words.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';


interface WordPair {
  english: string;
  spanish: string;
  matched: boolean;
}

@Component({
  selector: 'app-game-4',
  standalone: false,
  
  templateUrl: './game-4.component.html',
  styleUrl: './game-4.component.css'
})
export class Game4Component {
  wordPairs: WordPair[] = [];
  shuffledEnglish: string[] = [];
  shuffledSpanish: string[] = [];
  selectedEnglish: string | null = null;
  selectedSpanish: string | null = null;
  score: number = 0;
  percentCount: number = 0;
  correctCount: number = 0;
  errorsCount: number = 0;
  gameOver = false;

  constructor(private wordService: WordService, private router: Router, private apiService:ApiService) {}

  ngOnInit(): void {
    this.loadWords();
  }

  loadWords(): void {
    this.wordService.getData().subscribe({
      next: (data: { word: string; spanish: string[] }[]) => {
        this.wordPairs = data
          .sort(() => Math.random() - 0.5)
          .slice(0, 6)
          .map(pair => ({ 
            english: pair.word.toUpperCase(), 
            spanish: pair.spanish[0].toUpperCase(), 
            matched: false 
          }));
        this.shuffleWords();
      },
      error: (err) => {
        console.error('Error loading words:', err);
      }
    });
  }
  
  

  updatePercent() {
    const totalAttempts = this.correctCount + this.errorsCount;
    this.percentCount = totalAttempts === 0 ? 0 : Math.ceil((this.correctCount / totalAttempts) * 100);
  }

  shuffleWords(): void {
    this.shuffledEnglish = [...this.wordPairs.map(w => w.english.toUpperCase())].sort(() => Math.random() - 0.5);
    this.shuffledSpanish = [...this.wordPairs.map(w => w.spanish.toUpperCase())].sort(() => Math.random() - 0.5);
  }

  selectEnglish(word: string): void {
    if (!this.isMatched(word)) {
      this.selectedEnglish = word;
      this.checkMatch();
    }
  }

  selectSpanish(word: string): void {
    if (!this.isMatched(word)) {
      this.selectedSpanish = word;
      this.checkMatch();
    }
  }

  checkMatch(): void {
    if (this.selectedEnglish && this.selectedSpanish) {
      const matchIndex = this.wordPairs.findIndex(
        pair => pair.english === this.selectedEnglish && pair.spanish === this.selectedSpanish
      );

      if (matchIndex !== -1) {
        this.wordPairs[matchIndex].matched = true; // Marcar como emparejado
        this.correctCount++;
      } else {
        this.errorsCount++;
      }
      this.updatePercent();
      this.selectedEnglish = null;
      this.selectedSpanish = null;
      if(this.errorsCount >= 10 ){
        this.finishQuiz();
      }
      
    }
  }

  finishQuiz() {
    this.checkGameOver();
    this.router.navigate(["/result"], {
      queryParams: {
        percentage: this.percentCount,
        correctAnswers: this.correctCount,
        errors: this.errorsCount,
        gameAns: "this.wordPairs[matchIndex].matched",
        game: 4
      },
    });
  }

  checkGameOver() {
    if (this.errorsCount >= 10) {
      this.apiService.newScore(4, this.correctCount, this.errorsCount, this.percentCount).subscribe({
        next: (response) => {
        },
        error: (error) => {
          console.error('Error al registrar puntaje:', error);
        },
      });
    }
  }

  isMatched(word: string): boolean {
    return this.wordPairs.some(pair => (pair.english === word || pair.spanish === word) && pair.matched);
  }

  allMatched(): boolean {
    return this.wordPairs.every(pair => pair.matched);
  }

  shouldShowNextButton(): boolean {
    return this.allMatched();
  }
}
