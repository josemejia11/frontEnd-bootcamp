import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  public searchValue: string = '';

  constructor(private router: Router) {}

  public search(): void {
    this.router.navigate(['home'], { queryParams: { search: this.searchValue } });
    this.searchValue = '';
  }
}
