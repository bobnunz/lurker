import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { ORDSDataService } from '../ordsdata.service';
import { ORDSData } from '../ordsdata';
import {
  MatDialog,
  MatDialogConfig
} from "@angular/material/dialog";
import { DialogSaveToCSVComponent } from '../dialog-save-to-csv/dialog-save-to-csv.component';



import { element } from 'protractor';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { style } from '@angular/animations';
import { RowNode } from 'ag-grid-community';

interface MyType {
  [key: string]: any;
}


@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']})
export class BiddingComponent implements OnInit {


  @ViewChild('agGrid') agGrid: AgGridNg2;
  @Input() columnDefs: any[];
  @Input() defaultColDef: any;
  @Input() displayType: string;

  title = 'Boxscore Results';
  offset: number = 0;
  limit: number = 500;

  
  screenData: ORDSData = new ORDSData;
  yearRoundData: ORDSData = new ORDSData;
  tempData: ORDSData = new ORDSData;
  pinnedTopRowData: any;
  multiSortKey;
  gridApi;
  gridColumnApi;
  heightPx: number;
  yearType: number = 0;
  roundType: number = 0;
  // private menuObj: MyType = {};
  menuObj = new Map();
  objectKeys = Object.keys;
  menuButtonText;
  toolBar: string;

  constructor(private hds: ORDSDataService, private dialog: MatDialog) {

   

    // set the control key to use for multi-column sorting

    this.multiSortKey = 'ctrl';

    //array to hold top frozen rows

    this.pinnedTopRowData = [];

  }

  // function used in the html template code to get the years for the nested button menu (material)

  getMenuObjKeys(): Array<MyType> {
    return Array.from(this.menuObj.keys());

  }

  // called from button click to size the collumns to fit on the screen (ag-grid)

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }
  // called from button click to autosize all collumns (ag-grid)

  autoSize(params) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }

  // ag-grid callback? that gets called sometime after ngOnInit

  onGridReady(params) {
    let allColumnIds = [];

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }

  // set the button text to show the year and round displayed

  changeYrRndBtn() {
    this.menuButtonText = "Year: " + this.yearType + " / Round: " + this.roundType;
  }

  // open dialog for save to csv

  openDialog() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { filename: this.displayType };
    let dialogRef = this.dialog.open(DialogSaveToCSVComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      if (value.length > 0) {
        this.saveToCSV(value);
      }
    });
  
  }

  // save screen to cvs file from button click

  saveToCSV (filename: string) {
    let params = {
      skipHeader: true,
      columnGroups: false,
      skipFooters: true,
      skipGroups: true,
      skipPinnedTop: false,
      skipPinnedBottom: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: false,
      fileName: filename

    };

    // ag-grid call to save as csv

    this.gridApi.exportDataAsCsv(params);

  }

  // ag-grid  option to notify grid there is an external filter (disabled)
  /*
  isExternalFilterPresent (): boolean {
  return true;
}
*/
  doesExternalFilterPass = (node: RowNode): boolean => {
    return node.data.year == this.yearType && node.data.round == this.roundType;
  }

  // ag-grid - called from html templte when user makes selection (disabled)
  /*
  externalFilterChanged(newYear, newRound) {

    this.yearType = newYear;
    this.roundType = newRound;
    this.changeYrRndBtn();
    this.gridApi.onFilterChanged();
  }
*/

  // user selected year/round - click event from menu button

  getNewYearRound(newYear, newRound) {

    this.yearType = newYear;
    this.roundType = newRound;
    this.changeYrRndBtn();
    this.getYearRoundData(newYear, newRound);
  }

  // get all valid years/rounds to populate menu button

  async getAllYearsRounds() {

    let firstTime = true;


    this.yearRoundData = await this.hds.getAllORDSData('YEARSROUNDSALL', 0, 500, 0, 0)
      .toPromise();
    for (let value of this.yearRoundData.items) {
      if (!this.menuObj.has(value.year)) {
        this.menuObj.set(value.year, []);
      }
      if (firstTime) {
        firstTime = false;
        this.yearType = value.year;
        this.roundType = value.round;
        this.changeYrRndBtn();
      }

      this.menuObj.set(value.year, this.menuObj.get(value.year).concat(value.round));

    }


  }


  //  get all reults for all years/rounds (disabled)

  /*
 async getAllRusultsData() {
    this.tempData.hasMore = true;
    let offset: number = this.offset;
    let limit: number = this.limit;

    let times: number = 0;

    while (this.tempData.hasMore && times < 10) {
      times += 1;
      this.tempData = await this.hds.getAllORDSData('RESULTSALL', offset, limit, 0, 0)
        .toPromise();
      if (offset > 0) {
        this.resultsData.items = this.resultsData.items.concat(this.tempData.items);
      }
      else {
        this.resultsData = this.tempData;
      }
      offset += limit;
    }
  }

*/

  // get row data for selected year and round

  async getYearRoundData(year: number, round: number) {

    this.tempData.hasMore = true;
    let offset: number = this.offset;
    let limit: number = this.limit;
    let i: number = 0;
    let endI: number = 0;
    let dataTypeFlag: string;
    let times: number = 0;

    if (this.displayType === 'Results') {
      dataTypeFlag = 'RESULTSYEARROUND';
      endI = 3;
    }
    else if (this.displayType === 'Rosters') {
      dataTypeFlag = 'ROSTERSYEARROUND';
      endI = 2;
    }

    while (this.tempData.hasMore && times < 10) {
      times += 1;
      this.tempData = await this.hds.getAllORDSData(dataTypeFlag, offset, limit, year, round)
        .toPromise();
      
      if (offset > 0) {
        this.screenData.items = this.screenData.items.concat(this.tempData.items);
      }
      else {
        this.screenData = this.tempData;
      }
      offset += limit;
    }

    // freeze top rows

    this.pinnedTopRowData = [];
    for (i = 0; i < endI; i++) {
      this.pinnedTopRowData.push(this.screenData.items[i]);
    }
    this.screenData.items.splice(0, endI, 0);

  }


  async ngOnInit() {

    //set toolbar

    this.toolBar = "Box Score Lurker Site - " + this.displayType;

    //    this.getAllRusultsData();
    await this.getAllYearsRounds();
    this.getYearRoundData(this.yearType, this.roundType);

  }


}
