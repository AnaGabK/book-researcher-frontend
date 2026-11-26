import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';

interface ReadBook {
  id: number;
  title: string;
  author: string;
  coverClass: string;
  rating: number;
  finishedAt: string;
  pages: number;
}

interface Friend {
  id: number;
  nickname: string;
  initials: string;
  status: string;
  avatarClass: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class ProfileComponent {
  // Dados ilustrativos. Depois, carregue estas informações pelo UsuarioService.
  readonly usuario = {
    nickname: 'leitora_das_estrelas',
    nome: 'Ana Gabrielle',
    bio: 'Entre páginas e cafés, sempre procurando uma nova história para chamar de favorita. 📚☕',
    fotoUrl: '',
    membroDesde: 'Novembro de 2026',
    localizacao: 'Londrina, PR',
  };

  readonly livrosLidos: ReadBook[] = [
    {
      id: 1,
      title: 'A Biblioteca da Meia-Noite',
      author: 'Matt Haig',
      coverClass: 'cover-midnight',
      rating: 9,
      finishedAt: 'Nov 2026',
      pages: 368,
    },
    {
      id: 2,
      title: 'Orgulho e Preconceito',
      author: 'Jane Austen',
      coverClass: 'cover-pride',
      rating: 10,
      finishedAt: 'Out 2026',
      pages: 432,
    },
    {
      id: 3,
      title: 'O Hobbit',
      author: 'J. R. R. Tolkien',
      coverClass: 'cover-hobbit',
      rating: 8,
      finishedAt: 'Set 2026',
      pages: 310,
    },
    {
      id: 4,
      title: 'Os Sete Maridos de Evelyn Hugo',
      author: 'Taylor Jenkins Reid',
      coverClass: 'cover-evelyn',
      rating: 9,
      finishedAt: 'Ago 2026',
      pages: 360,
    },
    {
      id: 5,
      title: 'Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      coverClass: 'cover-prince',
      rating: 10,
      finishedAt: 'Jul 2026',
      pages: 96,
    },
  ];

  readonly amigos: Friend[] = [
    {
      id: 1,
      nickname: 'maria_livros',
      initials: 'ML',
      status: 'Lendo: Torto Arado',
      avatarClass: 'friend-rose',
    },
    {
      id: 2,
      nickname: 'bookworm_22',
      initials: 'BW',
      status: 'Lendo: O Nome do Vento',
      avatarClass: 'friend-sage',
    },
    {
      id: 3,
      nickname: 'joaoleitor',
      initials: 'JL',
      status: 'Visto por último hoje',
      avatarClass: 'friend-brown',
    },
    {
      id: 4,
      nickname: 'paginas_e_cafe',
      initials: 'PC',
      status: 'Lendo: A Hipótese do Amor',
      avatarClass: 'friend-lilac',
    },
  ];

  readonly favoritos = this.livrosLidos.filter((book) => book.rating === 10);
  readonly totalPaginas = computed(() =>
    this.livrosLidos.reduce((total, book) => total + book.pages, 0),
  );
  readonly mediaNotas = computed(() => {
    if (!this.livrosLidos.length) return '—';
    const media =
      this.livrosLidos.reduce((total, book) => total + book.rating, 0) / this.livrosLidos.length;
    return media.toFixed(1).replace('.', ',');
  });

  readonly mostrarTodos = signal(false);

  get livrosVisiveis(): ReadBook[] {
    return this.mostrarTodos() ? this.livrosLidos : this.livrosLidos.slice(0, 4);
  }

  alternarLivros(): void {
    this.mostrarTodos.update((value) => !value);
  }

  iniciaisDoUsuario(): string {
    return this.usuario.nome
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte[0])
      .join('')
      .toUpperCase();
  }
}
