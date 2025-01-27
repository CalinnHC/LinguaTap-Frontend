import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Chart, BarController, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar componentes necesarios
Chart.register(BarController, BarElement, CategoryScale, LinearScale);


@Component({
  selector: 'app-dashboard',
  standalone: false,
  
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  chart: any;
  constructor(private apiService: ApiService){
    this.getScoreByUser();
  }
  getScoreByUser(): void {
    this.apiService.getScoreByUser().subscribe({
      next: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          const filteredData = response.filter((item: { id_game: number; id_score: number; score: number }) => item.id_game === 1);
          const filteredData2 = response.filter((item: { id_game: number; id_score: number; score: number }) => item.id_game === 2);
          const filteredData3 = response.filter((item: { id_game: number; id_score: number; score: number }) => item.id_game === 3);
          const labels = filteredData.map((item: { id_score: number; score: number }) => item.id_score.toString());
          const scores = filteredData.map((item: { id_score: number; score: number }) => item.score);
          const labels2 = filteredData2.map((item: { id_score: number; score: number }) => item.id_score.toString());
          const scores2 = filteredData2.map((item: { id_score: number; score: number }) => item.score);
          const labels3 = filteredData3.map((item: { id_score: number; score: number }) => item.id_score.toString());
          const scores3 = filteredData3.map((item: { id_score: number; score: number }) => item.score);
  
          // Si ya existe una gráfica previa, destruirla antes de crear una nueva
          if (this.chart) {
            this.chart.destroy();
          }
  
          // Crear una nueva gráfica
          this.chart = new Chart('scoreChart', {
            type: 'bar',
            data: {
              labels: labels,
              datasets: [{
                label: 'Puntajes',
                data: scores,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });

          this.chart = new Chart('scoreChart2', {
            type: 'bar',
            data: {
              labels: labels2,
              datasets: [{
                label: 'Puntajes',
                data: scores2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
          this.chart = new Chart('scoreChart3', {
            type: 'bar',
            data: {
              labels: labels3,
              datasets: [{
                label: 'Puntajes',
                data: scores3,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }
          });
        } else {
          console.warn('No data available or response is empty.');
        }
      },
      error: (error) => {
        console.error('Error fetching user data.', error);
      },
      complete: () => {
        console.log('User data fetching completed.');
      }
    });
  }
  ngOnInit() {
    this.apiService.toggleSidebar(true);
  }

  ngOnDestroy() {
    this.apiService.toggleSidebar(false);
  }
  
}
