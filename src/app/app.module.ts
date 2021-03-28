import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/**
 * COMPONENTS
 */
import { HeroesListComponent } from './components/heroes-list/heroes-list.component';
import { HeroInsertComponent } from './components/hero-insert/hero-insert.component';
import { HeroEditComponent } from './components/hero-edit/hero-edit.component';
import { AppComponent } from './app.component';

// Material
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
/**
 * SERVICES
 */
import { HeroService } from './services/hero.service';
import {
  initHeroDatabase
} from './services/hero.service';
import { AccountService } from './services/account.service';
import {
  initAccountDatabase
} from './services/account.service';
import { CotisationService } from './services/cotisation.service';
import {
  initCotisationDatabase
} from './services/cotisation.service';
import { AmountPerAccountService } from './services/amount-per-account.service';
import {
  initAmountPerAccountDatabase
} from './services/amount-per-account.service';
import { AmountPerCompanyService } from './services/amount-per-company.service';
import {
  initAmountPerCompanyDatabase
} from './services/amount-per-company.service';
import { AddedPositionService } from './services/added-position.service';
import {
  initAddedPositionDatabase
} from './services/added-position.service';
import { HttpClientModule } from '@angular/common/http';
/**
 * PIPES
 */
import {
  AsyncNoZonePipe
} from './pipes/async-no-zone.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AccountInsertComponent } from './account/account-insert/account-insert.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccountEditComponent } from './account/account-edit/account-edit.component';
import { AccountComponent } from './account/account/account.component';
import { CotisationInsertComponent } from './components/cotisation/cotisation-insert/cotisation-insert.component';
import { CotisationListComponent } from './components/cotisation/cotisation-list/cotisation-list.component';
import { AddedPositionComponent } from './components/added-position/added-position-insert.component';
import { AmountPerAccountComponent } from './components/amount-per-account/amount-per-account-insert.component';
import { AmountPerCompanyComponent } from './components/amount-per-company/amount-per-company-insert.component';
import { AmountPerAccountListComponent } from './components/amount-per-account-list/amount-per-account-list.component';
import { WeeklyComponent } from './components/results/weekly/weekly.component';
import { AddedPositionListComponent } from './components/added-position/added-position-list/added-position-list.component';
import { PositionSizingComponent } from './components/results/position-sizing/position-sizing.component';
import { AmountPerCompanyListComponent } from './components/amount-per-company-list/amount-per-company-list.component';
import { CostBasisComponent } from './components/results/cost-basis/cost-basis.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesListComponent,
    HeroInsertComponent,
    HeroEditComponent,
    AsyncNoZonePipe,
    AccountInsertComponent,
    AccountListComponent,
    AccountEditComponent,
    AccountComponent,
    CotisationInsertComponent,
    CotisationListComponent,
    AddedPositionComponent,
    AmountPerAccountComponent,
    AmountPerCompanyComponent,
    AmountPerAccountListComponent,
    WeeklyComponent,
    AddedPositionListComponent,
    PositionSizingComponent,
    AmountPerCompanyListComponent,
    CostBasisComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    MatCardModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTabsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initHeroDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initAccountDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initCotisationDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initAmountPerAccountDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initAmountPerCompanyDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => initAddedPositionDatabase,
      multi: true,
      deps: [/* your dependencies */]
    },
    HeroService,
    AccountService,
    CotisationService,
    AmountPerAccountService,
    AmountPerCompanyService,
    AddedPositionService,
    AsyncNoZonePipe
  ],
  exports: [
    AsyncNoZonePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
