import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

type ReadingStatus = 'WISHLIST' | 'READING' | 'READ' | 'DROPPED';

interface BookDetails {
  id: number;
  title: string;
  originalTitle: string;
  author: string;
  synopsis: string;
  publicationYear: number;
  publisher: string;
  pages: number;
  language: string;
  isbn: string;
  genres: string[];
  coverUrl?: string;
}

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.css',
})
export class BookDetailComponent {
  // Conteúdo demonstrativo. Substitua pelos dados recebidos da API.
  readonly livro: BookDetails = {
    id: 1,
    title: 'A Biblioteca da Meia-Noite',
    originalTitle: 'The Midnight Library',
    author: 'Matt Haig',
    synopsis: `Entre a vida e a morte existe uma biblioteca, e dentro dessa biblioteca as prateleiras são infinitas. Cada livro oferece uma chance de experimentar outra vida que você poderia ter vivido. Enquanto Nora Seed se vê diante de uma decisão difícil, ela descobre que cada escolha abre um caminho diferente — e que talvez seja possível encontrar uma vida que valha a pena ser vivida.

Uma história sensível sobre arrependimentos, possibilidades e as pequenas coisas que tornam a vida especial.`,
    publicationYear: 2020,
    publisher: 'Bertrand Brasil',
    pages: 368,
    language: 'Português',
    isbn: '978-6558380547',
    genres: ['Ficção', 'Fantasia', 'Drama'],
    coverUrl: '',
  };

  readonly statusOptions: { value: ReadingStatus; label: string }[] = [
    { value: 'WISHLIST', label: 'Quero ler' },
    { value: 'READING', label: 'Lendo' },
    { value: 'READ', label: 'Lido' },
    { value: 'DROPPED', label: 'Abandonado' },
  ];

  status = signal<ReadingStatus | ''>('');
  nota = signal(0);
  observacao = signal('');
  adicionado = signal(false);
  mensagem = signal('');

  selecionarNota(valor: number): void {
    this.nota.set(valor);
  }

  adicionarNaLista(): void {
    if (!this.status()) {
      this.mensagem.set('Escolha um status para adicionar o livro à sua lista.');
      return;
    }

    this.adicionado.set(true);
    this.mensagem.set('Livro adicionado à sua lista!');
    // Integração futura: envie status(), nota() e observacao() para o serviço/API.
  }

  atualizarLista(): void {
    if (!this.status()) {
      this.adicionado.set(false);
      this.mensagem.set('Selecione um status para continuar.');
      return;
    }

    this.mensagem.set('Sua lista foi atualizada!');
    // Integração futura: atualize o registro do usuário na API.
  }

  removerDaLista(): void {
    this.status.set('');
    this.nota.set(0);
    this.observacao.set('');
    this.adicionado.set(false);
    this.mensagem.set('Livro removido da sua lista.');
  }
}
