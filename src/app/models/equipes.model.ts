import { Tournoi } from './tournoi.model';
export interface Equipe{

  id: number;
  name: string;
  group: number;
  tournoi: Tournoi;
}
