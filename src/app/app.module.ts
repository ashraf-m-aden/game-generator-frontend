import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { fr_FR } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './pages/header/header.component';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AllComponent } from './tournois/all/all.component';
import { DetailsComponent } from './tournois/details/details.component';
import { NewComponent } from './tournois/new/new.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { RedirectComponent } from './redirect/redirect.component';

registerLocaleData(fr);

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    components,
    AllComponent,
    DetailsComponent,
    NewComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzAlertModule,
    NzDatePickerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: fr_FR }, NzModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
