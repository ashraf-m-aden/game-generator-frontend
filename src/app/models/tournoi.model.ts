import { Game } from './games';
import { async } from '@angular/core/testing';
import { Equipe } from './equipes.model';
export interface Tournoi{

  id: number;
  name: string;
  groups: number;
  teams: Array<Equipe>;
  games: Array<Game>;
}
