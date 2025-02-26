import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    this.translatePage(selectedLang);
  }

  translatePage(targetLang: string) {
    const elements = document.querySelectorAll('[translate]');
    elements.forEach(element => {
      const text = element.textContent?.trim();
      if (text) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${this.apiKey}&q=${encodeURIComponent(text)}&target=${targetLang}`;

        this.http.get<any>(url).subscribe(response => {
          if (response.data && response.data.translations.length > 0) {
            element.textContent = response.data.translations[0].translatedText;
          }
        });
      }
    });
  }
}
