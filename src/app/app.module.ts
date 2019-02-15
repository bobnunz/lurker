import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input'; 

import { TabViewModule } from 'primeng/tabview';

import { BiddingComponent } from './bidding/bidding.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DialogSaveToCSVComponent } from './dialog-save-to-csv/dialog-save-to-csv.component';
 



@NgModule({
  declarations: [
    AppComponent,
    BiddingComponent,
    MainPageComponent,
    DialogSaveToCSVComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    MatToolbarModule,
    MatTabsModule,
    TabViewModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [DialogSaveToCSVComponent]

})
export class AppModule { }
