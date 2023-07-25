import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private router: Router) {}

  startGame() {
    // Aqui você pode definir a lógica para redirecionar o jogador para a página do jogo

    this.router.navigate(['/game']);
  }
}
