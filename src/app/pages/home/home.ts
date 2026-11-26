import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  coverClass: string;
  rating?: number;
  accessedAt?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  readonly termoBusca = signal('');

  // Dados ilustrativos: substitua pelos dados retornados pela sua API.
  readonly livrosRecentes: Book[] = [
    {
      id: 1,
      title: 'A Biblioteca da Meia-Noite',
      author: 'Matt Haig',
      category: 'Ficção',
      coverClass: 'cover-midnight',
      accessedAt: 'Acessado hoje',
    },
    {
      id: 2,
      title: 'É Assim que Acaba',
      author: 'Colleen Hoover',
      category: 'Romance',
      coverClass: 'cover-it-ends',
      accessedAt: 'Acessado ontem',
    },
    {
      id: 3,
      title: 'O Hobbit',
      author: 'J. R. R. Tolkien',
      category: 'Fantasia',
      coverClass: 'cover-hobbit',
      accessedAt: 'Acessado há 3 dias',
    },
    {
      id: 4,
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      category: 'Romance clássico',
      coverClass: 'cover-pride',
      accessedAt: 'Acessado há 5 dias',
    },
  ];

  readonly livrosPopulares: Book[] = [
    {
      id: 5,
      title: 'Verity',
      author: 'Colleen Hoover',
      category: 'Suspense',
      coverClass: 'cover-verity',
      rating: 4.8,
    },
    {
      id: 6,
      title: 'Café com Deus Pai',
      author: 'Junior Rostirola',
      category: 'Desenvolvimento pessoal',
      coverClass: 'cover-coffee',
      rating: 4.7,
    },
    {
      id: 7,
      title: 'Os Sete Maridos de Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      category: 'Ficção',
      coverClass: 'cover-evelyn',
      rating: 4.9,
    },
    {
      id: 8,
      title: 'Harry Potter e a Pedra Filosofal',
      author: 'J. K. Rowling',
      category: 'Fantasia',
      coverClass: 'cover-harry',
      rating: 4.9,
    },
  ];

  readonly recentesFiltrados = computed(() => {
    const termo = this.termoBusca().trim().toLocaleLowerCase('pt-BR');
    if (!termo) return this.livrosRecentes;

    return this.livrosRecentes.filter((book) =>
      `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase('pt-BR').includes(termo),
    );
  });

  readonly popularesFiltrados = computed(() => {
    const termo = this.termoBusca().trim().toLocaleLowerCase('pt-BR');
    if (!termo) return this.livrosPopulares;

    return this.livrosPopulares.filter((book) =>
      `${book.title} ${book.author} ${book.category}`.toLocaleLowerCase('pt-BR').includes(termo),
    );
  });

  atualizarBusca(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.termoBusca.set(valor);
  }

  limparBusca(): void {
    this.termoBusca.set('');
  }
}
