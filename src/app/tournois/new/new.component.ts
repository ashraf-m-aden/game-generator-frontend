import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Equipe } from 'src/app/models/equipes.model';
import { Tournoi } from 'src/app/models/tournoi.model';
import { EquipeService } from 'src/app/services/equipe.service';
@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {


  teamsNumber = 0; // le nombre d'equipes
  groupNumber = 1; // le nombre de groupes

  stepOne = true;
  stepTwo = false;
  isVisible = false;
  isConfirmLoading = false;

  teams = new Array();
  tournoi = '';
  confirmModal?: NzModalRef; // For testing by now

  constructor(private modal: NzModalService, private equipeS: EquipeService,
    private router: Router) { }

  ngOnInit(): void {
    this.generateTable();
  }

  plusTeam() {
    this.teamsNumber++;
    if ((this.teamsNumber % this.groupNumber) === 0) {
      this.removeTable();
      this.generateTable();
      this.generateGroups();
      this.generateTeams();
    }
  }

  minusTeam() {
    if (this.teamsNumber !== 0) {
      this.teamsNumber--;
      if ((this.teamsNumber % this.groupNumber) === 0) {
        this.removeTable();
        this.generateTable();
        this.generateGroups();
        this.generateTeams();
      }
    } else {
      this.teamsNumber = 0;
    }
  }
  plusGroup() {
    this.groupNumber++;
    if ((this.teamsNumber % this.groupNumber) === 0) {
      this.removeTable();
      this.generateTable();
      this.generateGroups();
      this.generateTeams();
    }
  }

  minusGroup() {
    if (this.groupNumber > 1) {
      this.groupNumber--;
      if ((this.teamsNumber % this.groupNumber) === 0) {
        this.removeTable();
        this.generateTable();
        this.generateGroups();
        this.generateTeams();
      }
    } else {
      this.groupNumber = 1;
    }
  }
  generateTable() {
    const tableDiv = document.getElementById('table_div');
    // creates a <table> element and a <tbody> element
    const table = document.createElement('table');
    table.setAttribute('id', 'table');
    table.setAttribute('class', 'table table-striped');
    const thead = document.createElement('thead');
    const theadTr = document.createElement('tr');
    theadTr.setAttribute('id', 'table_head');
    const td = document.createElement('td');
    td.setAttribute('class','h5 font-weight-bold')
    td.innerHTML = 'Groupe 1';
    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'table_body');

    /// nest cells
    theadTr.appendChild(td);
    thead.appendChild(theadTr);
    table.appendChild(thead);
    table.appendChild(tbody);
    tableDiv.appendChild(table);
  }
  removeTable() {
    const tableDiv = document.getElementById('table_div');
    const table = document.getElementsByTagName('table')[0];
    tableDiv.removeChild(table);
  }
  generateTeams() {
    // get the reference for the body
    const tbody = document.getElementById('table_body');

    const rowNumber = this.teamsNumber / this.groupNumber;
    if (Number.isInteger(rowNumber)) {
      // creating all cells
      for (let i = 0; i < rowNumber; i++) {
        // creates a table row
        const row = document.createElement('tr');

        for (let j = 0; j < this.groupNumber; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          const cell = document.createElement('td');
          //   const cellText = document.createTextNode('cell in row ' + i + ', column ' + j);
          const cellText = document.createElement('input');
          cellText.setAttribute('class', 'input input-group text-dark');
          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        // add the row to the end of the table body
        tbody.appendChild(row);
      }
    }

  }
  generateGroups() {
    // get the reference for the body
    const thead = document.getElementById('table_head');

    // creating all cells
    for (let i = 1; i < this.groupNumber; i++) {

      const cell = document.createElement('td');
      const cellText = document.createTextNode('Groupe ' + (i + 1));
      cell.setAttribute('class','h5 font-weight-bold')

      cell.appendChild(cellText);
      thead.appendChild(cell);
    }


  }

  saveTeams(row): void {
    const tbody = document.getElementById('table_body');
    for (let index = 0; index < row; index++) {
      const tr = tbody.childNodes[index];
      for (let y = 0; y < this.groupNumber; y++) {
        const td = tr.childNodes[y];
        if (this.teams[y] === undefined) {
          this.teams[y] = new Array();
          this.teams[y].push(
            (td.firstChild as HTMLInputElement).value);
        } else {
          this.teams[y].push(
            (td.firstChild as HTMLInputElement).value);
        }

      }
    }

  }

  showModal2(): void {
    const rowNumber = this.teamsNumber / this.groupNumber;
    if (Number.isInteger(rowNumber)) {
      this.saveTeams(rowNumber);
    }

  }


  paginate(){
    if (this.stepOne) {
      this.stepOne = false;
      this.stepTwo = true;
    } else {
      this.stepOne = true;
      this.stepTwo = false;
    }
  }


  // save the teams and the tournament
  save() {
    this.showModal2();

    this.equipeS.postOneTournoi({ name: this.tournoi, groups: this.groupNumber }).subscribe((data: Tournoi) => {
      for (let index = 0; index < this.teams.length; index++) {
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < this.teams[index].length; j++) {
          const team: Equipe = { id: null, name: '', group: null, tournoi: null };
          team.name = this.teams[index][j];
          team.group = index + 1;
          team.tournoi = data;
          this.equipeS.postOneTeam(team).subscribe((newTeam: Equipe) => {
          });
        }
      }
      this.router.navigate(['/tournois/' + data.id]);
    }, (error: any) => {

      console.log(error);

    });
  }
}

