import { Settings } from './../../models/setttings.model';
import { Equipe } from 'src/app/models/equipes.model';
import { Tournoi } from './../../models/tournoi.model';
import { EquipeService } from './../../services/equipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Game } from 'src/app/models/games';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  tournoi: Tournoi;
  teams: Array<Equipe>;
  date = null;
  games: Array<Game> = []; // là ou on enregistre tous les games
  savedCalendar: Array<any> = [];
  notFinish = false; // il y'a toujours des games en attentes

  settings: Settings = {
    id: null,
    tournoi: null,
    away: false,
    predefinedDays: false,
    intervalDays: false,
    interval: 0,
    predefined: [],
    groupPerDay: null,
    startDay: null,
    dates: []
  };

  teamsPerGroup; // nombre d'equipe par groupes
  maxGroups = null; // nombre de groupe qui joue par journée
  calendarExist = false;

  constructor(private equipeS: EquipeService, private activated: ActivatedRoute) {

// j'ais mis un setTimeout parceque j'ais remarqué un problem de chargement à la creation du tournoi
   setTimeout(() => {
         // une fois l'id du tournoi passé en paramatre je recupere le tournoi de la base de donnée

    activated.params.subscribe(data => {
      equipeS.getOneTournoi(data.id).subscribe((tournoi: Tournoi) => {
        this.tournoi = tournoi;
        this.maxGroups = tournoi.groups;
        this.teams = tournoi.teams;
        for (let index = 0; index < tournoi.groups; index++) {
          setTimeout(() => {
            this.generateTable(index + 1, this.teams);
          }, 2000);
        }
        this.teamsPerGroup = (this.teams.length / tournoi.groups) - 1;
        if (tournoi.games.length > 0) {
          let allSchedule: Array<string> = [];
          for (let index = 0; index < tournoi.games.length; index++) {
            allSchedule.push(tournoi.games[index].schedule);
          }
          this.savedCalendar = this.uniq(allSchedule);
          setTimeout(() => {
            this.loadTableSchedule();
          }, 2000);
        }
      });
    });
   }, 500);
  }

  ngOnInit(): void {
  }

  ////////////// tout ce qui est settings
  onChange(result: Date[]): void {
    this.date = result;
  }


  generateTable(group, array: Array<Equipe>) {
    const tableDiv = document.getElementById('table_div');
    // creates a <table> element and a <tbody> element
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    table.setAttribute('class', 'table table-striped');
    const thead = document.createElement('thead');
    thead.setAttribute('class', 'thead-dark bg-dark text-light font-weight-bold');
    const theadTr = document.createElement('tr');
    theadTr.setAttribute('id', 'table_head');
    const td = document.createElement('td');
    td.innerHTML = 'Groupe ' + group;
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'table_body');

    /// nest cells
    theadTr.appendChild(td);
    thead.appendChild(theadTr);
    table.appendChild(thead);
    table.appendChild(tbody);
    tableDiv.appendChild(table);

    // group est le numero de group, et array est le tableau de tout les equipes
    // creer des lignes avec le nom des equipes
    for (let index = 0; index < array.length; index++) {
      if (array[index].group === group) {
        const tbodyTr = document.createElement('tr');
        const td = document.createElement('td');
        td.innerHTML = array[index].name;
        tbodyTr.appendChild(td);
        tbody.appendChild(tbodyTr);
      }
    }
  }

  check(event) {
    switch (event.target.id) {
      case 'jp':
        this.settings.predefinedDays = true;
        this.settings.intervalDays = false;
        this.settings.interval = 0;
        break;
      case 'ij':
        this.settings.predefinedDays = false;
        this.settings.intervalDays = true;
        break;
    }

  }
  days(event) {

    // tslint:disable-next-line:radix
    const day = parseInt(event.target.id);
    // regarde si le checked est true ou pas
    if (event.target.checked) {
      this.settings.predefined.push(day);
    } else {
      this.settings.predefined = this.settings.predefined.filter((d) => {
        return d !== day;
      });
    }

  }
  /////////////////////////////// chargement du calendrier existant

  // permet de preparer les dates de jeux en avance et de les classer
  uniq(a) {
    let array = Array.from(new Set(a));
    array = array.sort((b: string, c: string) => {
      if (new Date(b) > new Date(c)) {
        return 1;
      }
      if (new Date(b) < new Date(c)) {
        return -1;
      }
      return 0;
    });
    return array;
  }

  loadTableSchedule() {
    // group est le numero de group, et array est le tableau de tout les equipes
    // creer des lignes avec le nom des equipes
    for (const oneDate of this.savedCalendar) {
      let groupGame = this.tournoi.games.filter(game => {
        return game.schedule === oneDate;
      });
      const tableDiv = document.getElementById('existant_table');
      // creates a <table> element and a <tbody> element
      const table = document.createElement('table');
      table.setAttribute('id', 'table_sched');
      table.setAttribute('class', 'table table-striped table-bordered col-6 col-md-2');
      const thead = document.createElement('thead');
      thead.setAttribute('class', 'thead-dark bg-dark text-light font-weight-bold');
      const theadTr = document.createElement('tr');
      theadTr.setAttribute('id', 'table_head_tr');
      const td = document.createElement('td');
      td.innerHTML = new Date(oneDate).getDate() + '/' + (new Date(oneDate).getMonth() + 1) + '/' + new Date(oneDate).getFullYear();
      const tbody = document.createElement('tbody');
      tbody.setAttribute('id', 'table_body_schedule');

      /// nest cells
      theadTr.appendChild(td);
      thead.appendChild(theadTr);
      table.appendChild(thead);
      table.appendChild(tbody);
      tableDiv.appendChild(table);
      for (const game of groupGame) {

        const tbodyTr = document.createElement('tr');
        tbody.setAttribute('class','bg-light text-dark');
        const tbodyTd = document.createElement('td');
        tbodyTd.setAttribute('class','font-weight-bold');
        tbodyTd.innerHTML = game.homeTeam.name + ' vs ' + game.awayTeam.name;
        tbodyTr.appendChild(tbodyTd);
        tbody.appendChild(tbodyTr);
      }

    }
  }


  ///////////////////////////// creation du calendrier

  // permet de creer tous les match possible sans aller retour
  createGamesOneWay() {
    for (let group = 1; group <= this.tournoi.groups; group++) {
      // tslint:disable-next-line:prefer-for-of
      for (const teamA of this.teams) {
        if (teamA.group === group) {
          for (const teamB of this.teams) {
            if (teamA !== teamB) {
              if (teamB.group === group) {
                let count = 0;
                // verifie si une entrée n'existe pas, si ils ne se sont jamais vu c'est bon
                for (const game of this.games) {
                  if (game.homeTeam === teamA && game.awayTeam === teamB) {
                    count++;
                  }
                  if (game.homeTeam === teamB && game.awayTeam === teamA) {
                    count++;
                  }
                }
                if (count === 0) {
                  const newGame: Game = {
                    id: null,
                    homeTeam: teamA,
                    awayTeam: teamB,
                    score: null,
                    schedule: null,
                    tournoi: this.tournoi,
                    groupe: group
                  };
                  this.games.push(newGame);
                }
              }
            }
          }

        }
      }
    }
  }

  // permet de creer match aller retour
  createGamesTwoWay() {
    for (let group = 1; group <= this.tournoi.groups; group++) {
      // tslint:disable-next-line:prefer-for-of
      for (const teamA of this.teams) {
        if (teamA.group === group) {
          for (const teamB of this.teams) {

            if (teamA !== teamB) {

              if (teamB.group === group) {
                let count = 0; // verifie combien de fois ils se sont vus
                for (const game of this.games) {
                  // si teamA n'as pas joué contre teamB à domicile, on cree un match
                  if (game.homeTeam === teamA && game.awayTeam === teamB) {
                    count++;
                  }
                }
                if (count === 0) {
                  const newGame: Game = {
                    id: null,
                    homeTeam: teamA,
                    awayTeam: teamB,
                    score: null,
                    schedule: null,
                    tournoi: this.tournoi,
                    groupe: group
                  };

                  this.games.push(newGame);
                }
              }
            }
          }
        }
      }
    }
  }

  // genere la date des jeux par journee avec interval predefini
  gamePerDayInterval() {
    let lastGroup = 1; // pour ne pas recommencer tous les groupes à chaque iteration
    // on incremente les jours sans interval
    let limits = lastGroup + this.settings.groupPerDay; // pour limiter le nombre de groupe par jour
    let startDate = this.settings.startDay;

    this.checkIfAllGroupPlayed();
    while (this.notFinish) { // une boucle qui ne s'arrete que si tous les groupes ont joué
      // boucle sur les groupes et on s'arrette au max de group par jour
      for (let group = lastGroup; group < limits; group++) {
        if (group > this.tournoi.groups) {
          break;
        }
        // creer un tableau de tous les games du meme group
        let groupGame = this.games.filter(game => {
          return game.groupe === group;
        });

        for (const game of groupGame) {
          // si le game na pas de schedule verifie si l'un deux n'a pas joué aujoud'hui
          if (game.schedule === null) {
            //
            if (this.checkIfPlayed(game.homeTeam, game.awayTeam, startDate.toDateString()) === false) {
              game.schedule = startDate.toDateString();

            }
          }
        }
      }
      lastGroup = limits;
      limits += this.settings.groupPerDay;
      this.settings.dates.push(startDate.toDateString());
      startDate.setDate(startDate.getDate() + 1 + this.settings.interval);
      this.checkIfAllGroupPlayed();
      if (lastGroup > this.tournoi.groups) {
        lastGroup = 1;
        limits = lastGroup + this.settings.groupPerDay;
      }

      setTimeout(() => {

      }, 3000);
    }
  }

  // genere la date des jeux par journee avec jour predefini
  gamePerDayPredefined() {
    let lastGroup = 1; // pour ne pas recommencer tous les groupes à chaque iteration
    // on incremente les jours sans interval
    let limits = lastGroup + this.settings.groupPerDay; // pour limiter le nombre de groupe par jour
    let startDate = this.settings.startDay;

    this.checkIfAllGroupPlayed();
    while (this.notFinish) { // une boucle qui ne s'arrete que si tous les groupes ont joué
      // boucle sur les groupes et on s'arrette au max de group par jour


      let dayNotFound = true;

      // l'iteration continue tant qu'on est pas dans le jour predfinit
      while (dayNotFound) {  // boucle daynotfound
        for (const today of this.settings.predefined) {   // boucle day

          if (startDate.getDay() === today) {
            for (let group = lastGroup; group < limits; group++) {
              if (group > this.tournoi.groups) {
                break;
              }
              // creer un tableau de tous les games du meme group
              let groupGame = this.games.filter(game => {
                return game.groupe === group;
              });

              for (const game of groupGame) {
                // si le game na pas de schedule verifie si l'un deux n'a pas joué aujoud'hui
                if (game.schedule === null) {

                  if (this.checkIfPlayed(game.homeTeam, game.awayTeam, startDate.toDateString()) === false) {
                    game.schedule = startDate.toDateString();
                  }
                }
              }
            }
            // ajoute cette date à la date des match
            this.settings.dates.push(startDate.toDateString());
            break; // la date est trouvé on peu casser la boucle day
          }
        }
        dayNotFound = false; // on a trouvé le jour on sort de la boucle daynotfound
      }
      lastGroup = limits;
      limits += this.settings.groupPerDay;
      startDate.setDate(startDate.getDate() + 1);
      this.checkIfAllGroupPlayed();

      if (lastGroup > this.tournoi.groups) {
        lastGroup = 1;
        limits = lastGroup + this.settings.groupPerDay;
      }

      setTimeout(() => {

      }, 3000);
    }
  }



  // regarde si l'equipe à jouer aujourd'hui
  checkIfPlayed(teamA, teamB, today) {
    let count = 0;
    for (const game of this.games) {
      if (game.homeTeam === teamA && game.awayTeam === teamB && game.schedule !== null) {
        count++;
      }
      if ((game.homeTeam === teamA || game.awayTeam === teamA) && game.schedule === today) {
        count++;
      }
      if ((game.homeTeam === teamB || game.awayTeam === teamB) && game.schedule === today) {
        count++;
      }
    }
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }

  checkIfAllGroupPlayed() {
    this.notFinish = false;
    for (const game of this.games) {
      // si il reste des match fais count++ et return false
      if (game.schedule === null) {
        this.notFinish = true;
      }
    }
  }

  generateTableSchedule() {
    // group est le numero de group, et array est le tableau de tout les equipes
    // creer des lignes avec le nom des equipes
    for (const oneDate of this.settings.dates) {
      let groupGame = this.games.filter(game => {
        return game.schedule === oneDate;
      });
      const tableDiv = document.getElementById('table_schedule');
      // creates a <table> element and a <tbody> element
      const table = document.createElement('table');
      table.setAttribute('id', 'table_sched');
      table.setAttribute('class', 'table table-striped table-bordered col-6 col-md-2');
      const thead = document.createElement('thead');
      thead.setAttribute('class', 'thead-dark bg-dark text-light font-weight-bold');
      const theadTr = document.createElement('tr');
      theadTr.setAttribute('id', 'table_head_tr');
      const td = document.createElement('td');
      td.innerHTML = new Date(oneDate).getDate() + '/' + (new Date(oneDate).getMonth() + 1) + '/' + new Date(oneDate).getFullYear();
      const tbody = document.createElement('tbody');
      tbody.setAttribute('id', 'table_body_schedule');

      /// nest cells
      theadTr.appendChild(td);
      thead.appendChild(theadTr);
      table.appendChild(thead);
      table.appendChild(tbody);
      tableDiv.appendChild(table);
      for (const game of groupGame) {

        const tbodyTr = document.createElement('tr');
        tbody.setAttribute('class','bg-light text-dark');
        const tbodyTd = document.createElement('td');
        tbodyTd.setAttribute('class','font-weight-bold');
        tbodyTd.innerHTML = game.homeTeam.name + ' vs ' + game.awayTeam.name;
        tbodyTr.appendChild(tbodyTd);
        tbody.appendChild(tbodyTr);
      }

    }
  }
  generateCalendar() {
    // pour supprimer le bouton enregistrer calendrier
    this.calendarExist = false;
    // pour effacer tout le calendrier
    const tableDiv = document.getElementById('table_schedule');
    while (tableDiv.firstChild) {
      tableDiv.removeChild(tableDiv.lastChild);
    }
    const tableexistant = document.getElementById('existant_table');
    while (tableexistant.firstChild) {
      tableexistant.removeChild(tableexistant.lastChild);
    }
    // pour effacer les donneées de jeux, les dates et reinitiliser le startDate
    this.games = [];
    this.settings.dates = [];
    const picker = document.getElementById('datepicker').children[0].children[0]
      .children[0].getAttribute('ng-reflect-model'); // c'est la valeur du date picker
    this.settings.startDay = new Date(picker);

    switch (this.settings.away) {
      case true:
        this.createGamesTwoWay();
        setTimeout(() => {
          if (this.settings.predefinedDays) {
            this.gamePerDayPredefined();
            this.generateTableSchedule();
          }
          else {
            this.gamePerDayInterval();
            this.generateTableSchedule();
          }
        }, 1000);
        break;
      case false:
        this.createGamesOneWay();
        setTimeout(() => {

          if (this.settings.predefinedDays) {
            this.gamePerDayPredefined();
            this.generateTableSchedule();
          }
          else {
            this.gamePerDayInterval();
            this.generateTableSchedule();
          }
        }, 1000);
        break;
    }
    this.calendarExist = true;
  }

  saveCalendar() {
    if (this.tournoi.games.length > 0) {
      for (const game of this.tournoi.games) {
        this.equipeS.removeOneCalendar(game.id).subscribe(() => {
        });
      }
      for (const game of this.games) {
        this.equipeS.postOneCalendar(game).subscribe((data) => {
        });
      }
    } else {
      for (const game of this.games) {
        this.equipeS.postOneCalendar(game).subscribe((data) => {
        });
      }
    }


  }

}
