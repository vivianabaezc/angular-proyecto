import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
    <button class="search-button">
      <img src="/assets/icons/lupa.jpg" alt="Buscar">
      Buscar
    </button>
  `,
  styles: [`
    .search-button {
      /* padding: 1em 2em; */
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 3em;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .search-button:hover {
      background-color: #0056b3;
    }
  `],
 
})
export class AppComponent {

  searchInput: string = '';
  userData: any = null;

  constructor(private http: HttpClient) {}
  noResults: boolean = false;
  searchUser() {
    if (this.searchInput) {
      this.http.get(`https://api.github.com/users/${this.searchInput.toLowerCase()}`)
        .subscribe((user: any) => {
          this.userData = user;
          // Verificar si se encontraron resultados
        if (!user) {
          this.noResults = true;
        } else {
          this.noResults = false;
        }
        }, error => {
          console.error('Error fetching user data', error);
          this.userData = null;
          this.noResults = true; 
        });
    }
  }

  onInputChange() {
    // Reset user data when the input changes
    this.userData = null;
  }
}
