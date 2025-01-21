import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WordService {

  constructor(private http: HttpClient) {}

  private words: { word: string, spanish: string[] }[] = [];
  
  getData(): Observable<{ word: string, spanish: string[] }[]> {
    return this.http.get<{ word: string, spanish: string[] }[]>('1000words.json')
      .pipe(
        tap((data) => {
          this.words = data;
        })
      );
  }

  getRandomWord(): { english: string, spanish: string } {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const wordEntry = this.words[randomIndex];
    const randomSpanishIndex = Math.floor(Math.random() * wordEntry.spanish.length);
    return {
      english: wordEntry.word,
      spanish: wordEntry.spanish[randomSpanishIndex]
    };
  }

  getWords() {

    return this.words;

  }
  
}


