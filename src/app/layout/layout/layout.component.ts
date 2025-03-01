import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  id = '0'
  loginSts: any;
  pageTitle: string = '';
  currentRoute: string = '';
  hideDashboard: boolean = false;
  apiKey: string = 'AIzaSyDiT96oQZTMA1A_sjslixQ0kA89F11ONtQ';

  constructor(private router: Router, private http: HttpClient) {
    this.loginSts = localStorage.getItem("loginStatus");
    if (this.loginSts == 1) {
      // User is logged in
    } else {
      // this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.getData();
    this.setPageTitle(this.router.url);

    // Subscribe to router events to update title on navigation
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setPageTitle(event.urlAfterRedirects);
      }
    });
  }

  setPageTitle(url: string) {
    switch (url) {
      case '/dashboard':
        this.pageTitle = 'Dashboard';
        break;
      case '/juristic-person-management':
        this.pageTitle = 'Juristic Person';
        break;
      case '/request':
        this.pageTitle = 'Request';
        break;
      case '/customer-management':
        this.pageTitle = 'Customer Management';
        break;
      case '/loan-creation':
        this.pageTitle = 'Loan Creation';
        break;
      case '/credit-card-creation':
        this.pageTitle = 'Credit Card Creation';
        break;
      case '/contact-us':
        this.pageTitle = 'Contact Us';
        break;
      case '/juristic-page/:id':
        this.pageTitle = 'Juristic Person Details';
        break;
      case '/customer-page/:id':
        this.pageTitle = 'Customer Details';
        break;
      case '/':
        this.pageTitle = 'Welcome';  // Default for home or root page
        break;
      default:
        this.pageTitle = 'Banking Application';  // Default for unmatched routes
    }
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  logout() {
    localStorage.removeItem("loginStatus");
    this.router.navigate(['/login']);
  } 

  getData() {
    this.id = localStorage.getItem('loginId');
  }

  updatePageTitle(newTitle: string) {
    this.pageTitle = newTitle;
  }

  isEmail(id: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(id);
  }

  changeLanguage(event: any) {
    const selectedLang = event.target.value;
    document.documentElement.lang = selectedLang;
    
    // ✅ Translate the page and page title
    this.translateText([this.pageTitle], selectedLang, (translatedTexts) => {
      if (translatedTexts.length > 0) {
        this.pageTitle = translatedTexts[0];
      }
    });

    this.translatePage(selectedLang);
  }

  translatePage(targetLang: string) {
    const elements = document.querySelectorAll('[translate]');
    let texts: string[] = [];

    elements.forEach(element => {
      if (element.textContent) {
        texts.push(element.textContent.trim());
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

