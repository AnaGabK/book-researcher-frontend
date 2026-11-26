import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

type BookStatus = 'READ' | 'READING' | 'WISHLIST' | 'DROPPED';

interface ShelfBook {
  id: number;
  title: string;
  author: string;
  status: BookStatus;
  rating?: number;
  progress?: number;
  pages: number;
  coverClass: string;
  finishedAt?: string;
}

@Component({
  selector: 'app-shelf',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './shelf.html',
  styleUrl: './shelf.css',
})
export class ShelfComponent {
  readonly categoriaSelecionada = signal<BookStatus>('READ');
  readonly busca = signal('');

  // Conteúdo demonstrativo: substitua pela resposta do seu serviço de livros.
  readonly livros: ShelfBook[] = (
    [
      {
        id: 1,
        title: 'A Biblioteca da Meia-Noite',
        author: 'Matt Haig',
        status: 'READ',
        rating: 9,
        pages: 368,
        coverClass: 'cover-midnight',
        finishedAt: 'Nov 2026',
      },
      {
        id: 6,
        title: 'Torto Arado',
        author: 'Itamar Vieira Junior',
        status: 'READING',
        progress: 62,
        pages: 264,
        coverClass: 'cover-arado',
      },
      {
        id: 9,
        title: 'Duna',
        author: 'Frank Herbert',
        status: 'WISHLIST',
        pages: 680,
        coverClass: 'cover-dune',
      },
      {
        id: 12,
        title: 'A Guerra dos Tronos',
        author: 'George R. R. Martin',
        status: 'DROPPED',
        pages: 592,
        coverClass: 'cover-thrones',
        progress: 19,
      },
    ] satisfies ShelfBook[]
  ).map((book) => ({
    ...book,
    pages: Number(book.pages),
  }));

  readonly categorias: { status: BookStatus; label: string; description: string }[] = [
    { status: 'READ', label: 'Lidos', description: 'Histórias que você já terminou' },
    { status: 'READING', label: 'Lendo', description: 'Suas leituras em andamento' },
    { status: 'WISHLIST', label: 'Quero ler', description: 'Livros na sua lista de desejos' },
    { status: 'DROPPED', label: 'Abandonados', description: 'Leituras que você decidiu pausar' },
  ];

  readonly livrosFiltrados = computed(() => {
    const termo = this.busca().trim().toLocaleLowerCase('pt-BR');
    return this.livros.filter((book) => {
      const mesmaCategoria = book.status === this.categoriaSelecionada();
      const correspondeBusca =
        !termo ||
        book.title.toLocaleLowerCase('pt-BR').includes(termo) ||
        book.author.toLocaleLowerCase('pt-BR').includes(termo);
      return mesmaCategoria && correspondeBusca;
    });
  });

  quantidade(status: BookStatus): number {
    return this.livros.filter((book) => book.status === status).length;
  }

  selecionarCategoria(status: BookStatus): void {
    this.categoriaSelecionada.set(status);
  }

  atualizarBusca(event: Event): void {
    this.busca.set((event.target as HTMLInputElement).value);
  }

  nomeCategoria(status: BookStatus): string {
    return this.categorias.find((item) => item.status === status)?.label ?? '';
  }
}
