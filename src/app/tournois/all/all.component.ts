import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { Equipe } from 'src/app/models/equipes.model';
import { Tournoi } from 'src/app/models/tournoi.model';
import { EquipeService } from 'src/app/services/equipe.service';
@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

  tournois: Array<Tournoi>;

  constructor(private modal: NzModalService, private equipeS: EquipeService,
              private router: Router) {
    equipeS.getAllTournoi().subscribe((data: Array<Tournoi>) => {
      this.tournois = data;
    });
  }

  ngOnInit(): void {
  }

  removeTournoi(id){
    this.equipeS.removeOneTournoi(id).subscribe(() => {
      this.router.navigateByUrl('/redirect/tournois');
    });
  }

}

