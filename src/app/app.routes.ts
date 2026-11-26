import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { HomeComponent } from './pages/home/home';
import { BookDetailComponent } from './pages/book-detail/book-detail';
import { ProfileComponent } from './pages/profile/profile';
import { ShelfComponent } from './pages/shelf/shelf';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'book', component: BookDetailComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'shelf', component: ShelfComponent },

  // Redireciona a rota inicial para o login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Redireciona rotas inexistentes
  { path: '**', redirectTo: 'login' },
];
