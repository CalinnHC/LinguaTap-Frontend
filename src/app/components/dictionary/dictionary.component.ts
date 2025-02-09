import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WordService } from '../../words.service';

@Component({
  selector: 'app-dictionary',
  standalone: false,
  
  templateUrl: './dictionary.component.html',
  styleUrl: './dictionary.component.css'
})
export class DictionaryComponent {
  words: any[] = [];
  searchText = '';
  currentPage = 1;
  itemsPerPage = 100;

  constructor(private apiService: ApiService, private wordService: WordService) {
    this.wordService.getData().subscribe({
      next: (data) => {
        this.words = data;
      },
      error: (err) => {
        console.error('Error loading words:', err);
      }
    });
  }

  get filteredWords() {
    const search = this.searchText.toLowerCase();
    const filtered = this.words.filter(word =>
      word.word.toLowerCase().includes(search) ||
      word.spanish.some((spanishWord: string) => spanishWord.toLowerCase().includes(search))
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  nextPage() {
    if (this.canGoToNextPage()) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  canGoToNextPage(): boolean {
    const search = this.searchText.toLowerCase();
    const totalFiltered = this.words.filter(word =>
      word.word.toLowerCase().includes(search) ||
      word.spanish.some((spanishWord: string) => spanishWord.toLowerCase().includes(search))
    ).length;
    return (this.currentPage * this.itemsPerPage) < totalFiltered;
  }

  ngOnInit() {
    this.apiService.toggleSidebar(true);
  }

  ngOnDestroy() {
    this.apiService.toggleSidebar(false);
  }
}
