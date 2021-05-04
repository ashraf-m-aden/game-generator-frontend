import { Equipe } from './equipes.model';
import { Tournoi } from './tournoi.model';
export interface Game{

  id: number;
  homeTeam: Equipe;
  awayTeam: Equipe;
  score: string;
  schedule: string;
  tournoi: Tournoi;
  groupe: number;
}
