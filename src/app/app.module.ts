import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';

import { TabViewModule } from 'primeng/tabview';
import { MatMenuModule } from '@angular/material/menu';
import { BiddingComponent } from './bidding/bidding.component';
import { MainPageComponent } from './main-page/main-page.component';
 



@NgModule({
  declarations: [
    AppComponent,
    BiddingComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    MatToolbarModule,
    MatTabsModule,
    TabViewModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
