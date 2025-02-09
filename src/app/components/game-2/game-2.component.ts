import { Component, HostListener, OnInit } from '@angular/core';
import { WordService } from '../../words.service';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ErrorReportComponent } from '../error-report/error-report.component';

@Component({
  selector: 'app-game-2',
  standalone: false,
  
  templateUrl: './game-2.component.html',
  styleUrl: './game-2.component.css'
})
export class Game2Component implements OnInit {
  englishWord: string = '';
  spanishWord: string = '';
  options: string[] = [];
  correctOption: string = '';
  message: string = '';
  percentCount: number = 0;
  correctCount: number = 0;
  errorsCount: number = 0;
  next: boolean = false;
  gameOver: boolean = false;
  selectedOption: string | null = null;
  showReport = false;


  constructor(private wordService: WordService, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.wordService.getData().subscribe({
      next: () => this.generateQuestion(),
      error: (err) => console.error('Error loading words:', err)
    });
  }


  abrirReporte() {
    this.showReport = true;
  }

  cerrarReporte() {
    this.showReport = false;
  }

  generateQuestion(): void {
    this.selectedOption = null;
    this.next = false;
    if (this.wordService.getWords().length === 0) {
      console.warn('No words available');
      return;
    }

    const randomWord = this.wordService.getRandomWord();
    this.englishWord = randomWord.english;
    this.spanishWord = randomWord.spanish;
    this.correctOption = randomWord.english;

    // Generate options
    const allWords = this.wordService.getWords().map(pair => pair.word);
    this.options = this.shuffleArray([
      this.correctOption,
      ...this.getRandomWords(allWords.filter(word => word !== this.correctOption), 3)
    ]);

    this.message = '';
  }

  getRandomWords(words: string[], count: number): string[] {
    const shuffled = this.shuffleArray(words);
    return shuffled.slice(0, count);
  }

  shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }

  checkAnswer(option: string): void {
    if (this.selectedOption) {
      return;
    }
  
    this.selectedOption = option;
  
    if (option === this.correctOption) {
      this.message = '¡Correcto!';
      this.correctCount++;
      this.next = true;
    } else {
      this.message = 'Respuesta Incorrecta';
      this.errorsCount++;
      this.next = true;
    }
    this.updatePercent();
    this.checkGameOver();
  }
  

  updatePercent() {
    const totalAttempts = this.correctCount + this.errorsCount;
    this.percentCount = totalAttempts === 0 ? 0 : Math.ceil((this.correctCount / totalAttempts) * 100);
  }

  checkGameOver() {
    if (this.errorsCount >= 10) {
      this.apiService.newScore(2, this.correctCount).subscribe({
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
  
  finishQuiz() {
    this.router.navigate(["/result"], {
      queryParams: {
        percentage: this.percentCount,
        correctAnswers: this.correctCount,
        errors: this.errorsCount,
        gameAns: this.englishWord,
        game: 2
      },
    });
  }
}
