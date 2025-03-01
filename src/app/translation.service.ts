import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiKey: string = 'AIzaSyDiT96oQZTMA1A_sjslixQ0kA89F11ONtQ';  // Replace with your API Key
  private currentLang = new BehaviorSubject<string>('en'); // Default Language: English
  language$ = this.currentLang.asObservable();

  constructor(private http: HttpClient) {
    const savedLang = localStorage.getItem('appLanguage');
    if (savedLang) {
      this.currentLang.next(savedLang);
    }
  }

  setLanguage(lang: string) {
    this.currentLang.next(lang);
    localStorage.setItem('appLanguage', lang); // Persist language choice
  }

  translateText(texts: string[], targetLang: string) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
    const body = { q: texts, target: targetLang };

    return this.http.post<any>(url, body).pipe(
      catchError(error => {
        console.error("Translation API error:", error);
        return throwError(error);
      })
    );
  }
}
