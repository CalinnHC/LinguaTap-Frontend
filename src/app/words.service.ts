import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {

  private words = [
    { "word": "us", "spanish": ["nos", "nosotros"] },
    { "word": "most", "spanish": ["la mayoría", "el mayor número", "el máximo"] },
    { "word": "day", "spanish": ["día"] },
    { "word": "give", "spanish": ["dar"] },
    { "word": "these", "spanish": ["estos", "estas"] },
    { "word": "any", "spanish": ["alguno", "cualquiera"] },
    { "word": "because", "spanish": ["porque"] },
    { "word": "want", "spanish": ["querer"] },
    { "word": "new", "spanish": ["nuevo"] },
    { "word": "even", "spanish": ["incluso", "aún", "parejo"] },
    { "word": "way", "spanish": ["camino", "manera", "método"] },
    { "word": "well", "spanish": ["bien"] },
    { "word": "first", "spanish": ["primero"] },
    { "word": "work", "spanish": ["trabajo", "trabajar"] },
    { "word": "our", "spanish": ["nuestro"] },
    { "word": "how", "spanish": ["cómo", "como"] },
    { "word": "two", "spanish": ["dos"] },
    { "word": "use", "spanish": ["usar", "uso"] },
    { "word": "after", "spanish": ["después de"] },
    { "word": "back", "spanish": ["de vuelta", "atrás", "espalda"] },
    { "word": "also", "spanish": ["también"] },
    { "word": "think", "spanish": ["pensar"] },
    { "word": "over", "spanish": ["encima de", "por encima de", "más de"] },
    { "word": "its", "spanish": ["eso", "esa"] },
    { "word": "come", "spanish": ["venir", "llegar"] },
    { "word": "only", "spanish": ["solo", "solamente", "únicamente"] },
    { "word": "look", "spanish": ["mirar", "buscar", "parecer"] },
    { "word": "now", "spanish": ["ahora"] },
    { "word": "then", "spanish": ["entonces"] },
    { "word": "than", "spanish": ["que"] },
    { "word": "other", "spanish": ["otra", "otro"] },
    { "word": "see", "spanish": ["ver"] },
    { "word": "them", "spanish": ["ellos", "los"] },
    { "word": "could", "spanish": ["podría", "podríamos", "podrían"] },
    { "word": "some", "spanish": ["algo", "alguno", "algunas"] },
    { "word": "good", "spanish": ["bueno"] },
    { "word": "your", "spanish": ["tu", "tus"] },
    { "word": "year", "spanish": ["año"] },
    { "word": "into", "spanish": ["dentro de", "en", "contra"] },
    { "word": "people", "spanish": ["gente", "personas"] },
    { "word": "take", "spanish": ["tomar"] },
    { "word": "know", "spanish": ["saber", "conocer"] },
    { "word": "him", "spanish": ["él"] },
    { "word": "just", "spanish": ["solo", "justo", "acabar de"] },
    { "word": "no", "spanish": ["no"] },
    { "word": "time", "spanish": ["tiempo"] },
    { "word": "like", "spanish": ["gustar", "como"] },
    { "word": "can", "spanish": ["puede"] },
    { "word": "make", "spanish": ["hacer"] },
    { "word": "when", "spanish": ["cuando", "cuándo"] },
    { "word": "me", "spanish": ["yo", "me", "mi"] },
    { "word": "go", "spanish": ["ir"] },
    { "word": "which", "spanish": ["cuál", "el cual"] },
    { "word": "get", "spanish": ["obtener"] },
    { "word": "who", "spanish": ["quién"] },
    { "word": "about", "spanish": ["sobre", "acerca de"] },
    { "word": "if", "spanish": ["si"] },
    { "word": "out", "spanish": ["afuera", "fuera", "lejos"] },
    { "word": "up", "spanish": ["arriba"] },
    { "word": "so", "spanish": ["así", "tan"] },
    { "word": "what", "spanish": ["qué"] },
    { "word": "their", "spanish": ["ellos"] },
    { "word": "there", "spanish": ["allá", "allí"] },
    { "word": "would", "spanish": ["terminación -ría"] },
    { "word": "all", "spanish": ["todo", "todos"] },
    { "word": "one", "spanish": ["uno"] },
    { "word": "my", "spanish": ["mio", "mia"] },
    { "word": "will", "spanish": ["voluntad"] },
    { "word": "an", "spanish": ["un", "una"] },
    { "word": "or", "spanish": ["o"] },
    { "word": "she", "spanish": ["ella"] },
    { "word": "her", "spanish": ["ella"] },
    { "word": "say", "spanish": ["decir"] },
    { "word": "we", "spanish": ["nosotros"] },
    { "word": "they", "spanish": ["ellos"] },
    { "word": "from", "spanish": ["de", "desde"] },
    { "word": "by", "spanish": ["por"] },
    { "word": "his", "spanish": ["el"] },
    { "word": "but", "spanish": ["pero"] },
    { "word": "this", "spanish": ["esto", "esta"] },
    { "word": "at", "spanish": ["a", "en"] },
    { "word": "do", "spanish": ["hacer"] },
    { "word": "you", "spanish": ["tú", "usted"] },
    { "word": "as", "spanish": ["como"] },
    { "word": "he", "spanish": ["él"] },
    { "word": "with", "spanish": ["con"] },
    { "word": "on", "spanish": ["en", "sobre"] },
    { "word": "not", "spanish": ["no"] },
    { "word": "for", "spanish": ["para"] },
    { "word": "it", "spanish": ["él", "lo", "la", "eso", "esto"] },
    { "word": "I", "spanish": ["yo"] },
    { "word": "have", "spanish": ["tener", "haber"] },
    { "word": "that", "spanish": ["que", "eso", "cual"] },
    { "word": "in", "spanish": ["en", "dentro de"] },
    { "word": "a", "spanish": ["un", "una"] },
    { "word": "and", "spanish": ["y"] },
    { "word": "of", "spanish": ["de"] },
    { "word": "to", "spanish": ["a", "hacia", "hasta", "por", "para"] },
    { "word": "be", "spanish": ["ser", "estar"] },
    { "word": "the", "spanish": ["el", "la", "los", "las"] }
  ]
  ;

  constructor() { }

  getRandomWord(): { english: string, spanish: string } {
    const randomIndex = Math.floor(Math.random() * this.words.length);
    const wordEntry = this.words[randomIndex];
    const randomSpanishIndex = Math.floor(Math.random() * wordEntry.spanish.length);
    return {
      english: wordEntry.word,
      spanish: wordEntry.spanish[randomSpanishIndex]
    };
  }
}


