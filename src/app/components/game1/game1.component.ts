import { Component, HostListener } from '@angular/core';
import { WordService } from '../../words.service';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-game1',
  standalone: false,
  templateUrl: './game1.component.html',
  styleUrl: './game1.component.css'
})
export class Game1Component{
  randomWord: { english: string, spanish: string } | null = null;
  gameNumber: number = 1;
  word: string = '';
  displayedWord: string[] = [];
  currentGuess: string = '';
  correctCount: number = 0;
  errorsCount: number = 0;
  guessedLetters: boolean[] = [];
  gameOver: boolean = false;
  percentCount: number = 0;
  goodAns: boolean = false;
  message: string = '';

  constructor(private wordService: WordService, private router: Router, private apiService: ApiService) {
    this.initializeGame();
    if(!apiService.isLoggedInSubject.value) {
      this.navigateTo('/');
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const guess = event.key.toLowerCase();
    if(this.goodAns){
      if (guess === 'enter' || guess === ' ') {
        console.log(this.message);
        this.message = '';
        this.goodAns = !this.goodAns;
        this.initializeGame();
      }
    }
    else if (this.isValidGuess(guess)) {
      this.currentGuess = guess;
      this.checkGuess();
      this.checkGameOver();
    }
    
  }

  initializeGame() {
    this.gameOver = false;
    this.randomWord = this.wordService.getRandomWord();
    this.word = this.randomWord.english;
    this.displayedWord = Array(this.word.length).fill('_');
    this.guessedLetters = Array(this.word.length).fill(false);
  }

  isValidGuess(guess: string): boolean {
    return /^[a-zA-Z]$/.test(guess) && !this.gameOver;
  }

  checkGuess() {
    let found = false;
    let guessed: boolean = false; 
    this.word.split('').forEach((char, index) => {
      if (char === this.currentGuess) {
        if(!this.guessedLetters[index]){
          this.displayedWord[index] = char;
          this.guessedLetters[index] = true;
          found = true;
        }
        else if(this.guessedLetters[index]){
          guessed = true;
        }
      }
    });
    if(!guessed){
      if (found) {
        this.correctCount++;
      } else {
        this.errorsCount++;
      }
      this.updatePercent();
    }
  }

  updatePercent() {
    const totalAttempts = this.correctCount + this.errorsCount;
    this.percentCount = totalAttempts === 0 ? 0 : Math.ceil((this.correctCount / totalAttempts) * 100);
  }

  checkGameOver() {
    if (!this.displayedWord.includes('_')) {
      this.message = 'Presiona Enter o Espacio para continuar.';
      this.goodAns = true;
    } else if (this.errorsCount >= 10) {
      this.gameOver = true;
      alert(`¡Has perdido! La palabra correcta era: ${this.word}`);
      this.apiService.newScore(1, this.correctCount).subscribe({
        next: (response) => {
          console.log('Puntaje registrado:', response);
        },
        error: (error) => {
          console.error('Error al registrar puntaje:', error);
        },
      });
      this.correctCount = 0;
      this.errorsCount = 0;
      this.updatePercent();
      this.initializeGame();
    }
  }
    navigateTo(route: string) {
      this.router.navigate([route]);
    }
}
