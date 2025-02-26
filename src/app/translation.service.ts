import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiKey = 'AIzaSyDiT96oQZTMA1A_sjslixQ0kA89F11ONtQ';
  private apiUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translateText(text: string, targetLang: string) {
    const url = `${this.apiUrl}?q=${encodeURIComponent(text)}&target=${targetLang}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
