import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
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
  guessedLetters: boolean[] = [];
  gameOver: boolean = false;
  percentCount: number = 0;
  correctCount: number = 0;
  errorsCount: number = 0;
  goodAns: boolean = false;
  message: string = '';
  alphabet: string[] = 'abcdefghijklmnopqrstuvwxyz'.split('');
  row1: string[] = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  row2: string[] = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'];
  row3: string[] = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
  guessedLettersMap: { [key: string]: boolean } = {};

  constructor(private wordService: WordService, private router: Router, private apiService: ApiService) {
    this.alphabet.forEach(char => (this.guessedLettersMap[char] = false));
    this.initializeGame();
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

  
  get buttonNextClasses() {
    return {
      'visible': this.goodAns
    };
  }

  initializeGame() {
    this.wordService.getData().subscribe({
      next: () => {
        this.gameOver = false;
        this.randomWord = this.wordService.getRandomWord();
        this.word = this.randomWord.english.toLowerCase();
        this.displayedWord = Array(this.word.length).fill('_');
        this.guessedLetters = Array(this.word.length).fill(false);
        this.guessedLettersMap = {};
        this.alphabet.forEach(char => (this.guessedLettersMap[char] = false));
      },
      error: (err) => {
        console.error('Error loading words:', err);
      }
    });
  }

  isValidGuess(guess: string): boolean {
    return /^[a-zA-Z]$/.test(guess);
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
      this.apiService.newScore(1, this.correctCount).subscribe({
        next: (response) => {
          console.log('Puntaje registrado:', response);
        },
        error: (error) => {
          console.error('Error al registrar puntaje:', error);
        },
      });
      this.finishQuiz();
    }
  }
    navigateTo(route: string) {
      this.router.navigate([route]);
    }

    finishQuiz() {
      this.router.navigate(["/result"], {
        queryParams: {
          percentage: this.percentCount,
          correctAnswers: this.correctCount,
          errors: this.errorsCount,
          gameAns: this.word,
          game: 1
        },
      });
    }

    onLetterClick(letter: string) {
      if (this.isValidGuess(letter)) {
        this.currentGuess = letter;
        this.guessedLettersMap[letter] = true; // Marcar letra como usada
        this.checkGuess();
        this.checkGameOver();
      }
    }

    onBackspace() {
      // Lógica para manejar la acción de 'Borrar'
      if (this.currentGuess) {
        this.currentGuess = '';
      }
    }
  
    onEnter() {
      // Lógica para manejar la acción de 'Enter'
      if (this.isValidGuess(this.currentGuess)) {
        this.checkGuess();
        this.checkGameOver();
      }
    }

    nextWord() {
      this.initializeGame(); // Inicia una nueva palabra
      this.goodAns = false;  // Desactiva la opción para continuar hasta adivinar la siguiente palabra
      this.message = ''; // Limpiar el mensaje
    }
}
