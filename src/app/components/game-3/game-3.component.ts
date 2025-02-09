import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { WordService } from '../../words.service';
import { ApiService } from '../../services/api.service';
import { ErrorReportComponent } from '../error-report/error-report.component';

@Component({
  selector: 'app-game-3',
  standalone: false,
  
  templateUrl: './game-3.component.html',
  styleUrl: './game-3.component.css'
})
export class Game3Component {
  verbs = [
    { Base: "arise", "Past-simple": "arose", "Past-Participle": "arisen" },
    { Base: "awake", "Past-simple": "awoke", "Past-Participle": "awoken" },
    { Base: "be", "Past-simple": "was", "Past-Participle": "been" },
    { Base: "bear", "Past-simple": "bore", "Past-Participle": "born" }
  ];
  currentVerb = this.verbs[0];
  currentIndex = 0;
  score = 0;
  gameOver = false;
  userAnswer = { simple: '', participle: '' };
  percentCount: number = 0;
  correctCount: number = 0;
  errorsCount: number = 0;
  feedbackPastSimple = '';
  feedbackPastParticiple = '';
  isChecked = false;
  isParticipleCorrect = false;
  isSimpleCorrect = false;
  showReport = false;

  constructor(private wordService:WordService, private apiService:ApiService, private router: Router){

  }

  ngOnInit(): void {
    this.nextVerb();
  }

  @HostListener('document:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
      const guess = event.key.toLowerCase();
      if(this.userAnswer.simple.trim() !== '' && this.userAnswer.participle.trim() !== ''){
        if (guess === 'enter' ) {
          this.checkAnswer();
        }
      }
    }
  

    abrirReporte() {
      this.showReport = true;
    }
  
    cerrarReporte() {
      this.showReport = false;
    }

  checkAnswer() {
    if (!this.isChecked) {
      const { simple, participle } = this.userAnswer;
      const simpleAnswer = simple.trim().toLowerCase();
      const participleAnswer = participle.trim().toLowerCase();
      // Compara el Past Participle con múltiples respuestas posibles
      if (this.currentVerb["Past-Participle"].includes(participleAnswer)) {
        this.correctCount++;
        this.feedbackPastParticiple = 'Correct!';
        this.isParticipleCorrect = true;
      } else {
        this.feedbackPastParticiple = this.currentVerb['Past-Participle'];
        this.isParticipleCorrect = false;
        this.errorsCount++;
      }
  
      // Compara el Past Simple
      if (this.currentVerb["Past-simple"].includes(simpleAnswer)) {
        this.correctCount++;
        this.feedbackPastSimple = 'Correct!';
        this.isSimpleCorrect = true;
      } else {
        this.feedbackPastSimple = this.currentVerb['Past-simple'];
        this.isSimpleCorrect = false;
        this.errorsCount++;
      }
  
      this.isChecked = true;
    } else {
      this.userAnswer = { simple: '', participle: '' };
      this.isChecked = false;
      this.nextVerb();
      this.feedbackPastSimple = "";
      this.feedbackPastParticiple = "";
      this.checkGameOver();
    }
    this.updatePercent();
  }
  
  
  
  nextVerb() {
    this.wordService.getRandomIrregularVerb().subscribe((randomVerb) => {
      this.currentVerb = randomVerb;
    });
    console.log(this.currentVerb["Past-simple"] )
    console.log(this.currentVerb["Past-Participle"] )
  }

  restartGame() {
    this.currentIndex = 0;
    this.currentVerb = this.verbs[0];
    this.score = 0;
    this.gameOver = false;
    this.userAnswer = { simple: '', participle: '' };
  }

  updatePercent() {
    const totalAttempts = this.correctCount + this.errorsCount;
    this.percentCount = totalAttempts === 0 ? 0 : Math.ceil((this.correctCount / totalAttempts) * 100);
  }

  finishQuiz() {
    this.router.navigate(["/result"], {
      queryParams: {
        percentage: this.percentCount,
        correctAnswers: this.correctCount,
        errors: this.errorsCount,
        gameAns: "Simple: "+this.currentVerb['Past-simple'] + ", Participle: "+ this.currentVerb['Past-Participle'],
        game: 3
      },
    });
  }

  checkGameOver() {
    if (this.errorsCount >= 10) {
      this.apiService.newScore(3, this.correctCount).subscribe({
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

  get isNextButtonEnabled(): boolean {
    return this.userAnswer.simple.trim() !== '' && this.userAnswer.participle.trim() !== '';
  }
}
