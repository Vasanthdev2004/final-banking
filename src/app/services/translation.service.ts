import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private apiKey: string = 'AIzaSyDiT96oQZTMA1A_sjslixQ0kA89F11ONtQ'; // Use your API key
  private originalTexts: { [key: string]: string } = {}; // Store original texts

  constructor(private http: HttpClient) {}

  // Translate function
  translatePage(targetLang: string) {
    const elements = document.querySelectorAll('[translate]');
    let texts: string[] = [];

    elements.forEach(element => {
      const text = element.textContent?.trim() || ''; // Avoid null or undefined errors

      if (text) {
        if (!this.originalTexts[text]) {
          this.originalTexts[text] = text; // Store original text
        }
        texts.push(text);
      }
    });

    if (texts.length > 0) {
      this.translateText(texts, targetLang, (translatedTexts) => {
        elements.forEach((element, index) => {
          element.textContent = translatedTexts[index] || element.textContent;
        });
      });
    }
  }

  // Restore original text when switching back to English
  restoreOriginalText() {
    const elements = document.querySelectorAll('[translate]');
    elements.forEach(element => {
      const text = element.textContent?.trim() || ''; // Get current text safely
      const original = this.originalTexts[text]; // Find original text

      if (original) {
        element.textContent = original; // Restore correctly
      }
    });
  }

  // API call to Google Translate
  translateText(texts: string[], targetLang: string, callback: (translatedTexts: string[]) => void) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}`;
    const body = { q: texts, target: targetLang };

    this.http.post<any>(url, body)
      .pipe(
        catchError(error => {
          console.error("Translation API error:", error);
          return throwError(error);
        })
      )
      .subscribe(response => {
        if (response.data && response.data.translations) {
          callback(response.data.translations.map((t: any) => t.translatedText));
        }
      });
  }
}
