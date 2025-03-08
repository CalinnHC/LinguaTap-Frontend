import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { WordService } from '../../words.service';

@Component({
  selector: 'app-irregular-verbs',
  standalone: false,
  
  templateUrl: './irregular-verbs.component.html',
  styleUrl: './irregular-verbs.component.css'
})
export class IrregularVerbsComponent {
    verbsArray: any[] = [];
    filteredVerbs: any[] = [];
    searchText: string = '';
    itemsPerPage: number = 10;
    searchTerm = '';
    displayedVerbs = [...this.verbsArray.slice(0, 50)];
    currentPage = 0;
    verbsPerPage = 50;
  
    constructor(private wordService: WordService, private apiService:ApiService) {}
  
    ngOnInit(): void {
      this.fetchVerbs();
      this.updatePage();
      this.apiService.toggleSidebar(true);
    }
  
    ngOnDestroy() {
      this.apiService.toggleSidebar(false);
    }
  
    fetchVerbs(): void {
      this.wordService.getAllIrregularVerb().subscribe({
        next: (data) => {
          this.verbsArray = Array.isArray(data) ? data : [data];
          this.displayedVerbs = this.verbsArray.slice(0, 0 + this.verbsPerPage);
        },
        error: (err) => {
          console.error('Error loading words:', err);
        }
      });
    }
  
    

  get maxPage() {
    return Math.floor(this.verbsArray.length / this.verbsPerPage);
  }

  filterVerbs() {
    if (this.searchTerm) {
      this.displayedVerbs = this.verbsArray.filter(verbsArray =>
        verbsArray.Base.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.updatePage();
    }
  }

  updatePage() {
    const start = this.currentPage * this.verbsPerPage;
    this.displayedVerbs = this.verbsArray.slice(start, start + this.verbsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.currentPage++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePage();
    }
  }
}
