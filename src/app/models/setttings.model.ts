import { Tournoi } from './tournoi.model';
export interface Settings{

  id: number;
  tournoi: Tournoi;
  away: boolean;
  predefinedDays: boolean;
  intervalDays: boolean;
  interval: number;
  predefined: Array<number>;
  startDay: Date;
  groupPerDay: number;
  dates: Array<string>;

}
