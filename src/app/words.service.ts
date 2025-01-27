import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class WordService {

  constructor(private http: HttpClient) {}

  private words: { word: string, spanish: string[] }[] = [];

  irregularVerbs: { Base: string, "Past-simple": string, "Past-Participle": string }[] = [];

  
  getIrregularVerbs(): Observable<{ Base: string, "Past-simple": string, "Past-Participle": string }[]> {
    return this.http.get<{ Base: string, "Past-simple": string, "Past-Participle": string }[]>('irregularVerbs.json')
      .pipe(
        tap((data) => {
          this.irregularVerbs = data; // Guardar los verbos en una propiedad local
        })
      );
  }

  getData(): Observable<{ word: string, spanish: string[] }[]> {
    return this.http.get<{ word: string, spanish: string[] }[]>('1000words.json')
      .pipe(
        tap((data) => {
          this.words = data;
        })
      );
  }

  getRandomIrregularVerb(): Observable<{ Base: string; 'Past-simple': string; 'Past-Participle': string }> {
    return this.getIrregularVerbs().pipe(
      map((data: any) => {
        const verbs = data.verbs;
        const randomIndex = Math.floor(Math.random() * verbs.length); // Calcular con la longitud real
        return verbs[randomIndex]; // Retorna un verbo aleatorio
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

  getCountries(): Observable<any> {
    return this.http.get<any>('countries.json'); 
  }
  
}


