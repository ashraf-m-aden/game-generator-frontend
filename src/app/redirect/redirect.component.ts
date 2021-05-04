import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private activated: ActivatedRoute, private router: Router) {
    activated.params.subscribe((data) =>{
      router.navigateByUrl(data.url);
    });
   }

  ngOnInit(): void {
  }

}
