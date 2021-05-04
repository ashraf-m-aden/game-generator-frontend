import { RedirectComponent } from './redirect/redirect.component';
import { NewComponent } from './tournois/new/new.component';
import { DetailsComponent } from './tournois/details/details.component';
import { AllComponent } from './tournois/all/all.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', redirectTo: '/tournois', pathMatch: 'full'
  },
   {
    path: '*', redirectTo: '/tournois', pathMatch: 'full'
  }
  ,
  {
    path: 'tournois', component: AllComponent, pathMatch: 'full'
  },
  {
    path: 'tournois/:id', component: DetailsComponent, pathMatch: 'full'
  },
  {
    path: 'nouveau-tournoi', component: NewComponent, pathMatch: 'full'
  },

  {
    path: 'redirect/:url', component: RedirectComponent, pathMatch: 'full'
  },

];

export const components = [
  DashboardComponent, AllComponent
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
