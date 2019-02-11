import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';
import { ORDSDataService } from '../ordsdata.service';
import { ORDSData } from '../ordsdata';


import { element } from 'protractor';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { style } from '@angular/animations';
import { RowNode } from 'ag-grid-community';

interface MyType {
  [key: string]: any;
}


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {


  @ViewChild('agGrid') agGrid: AgGridNg2;

  title = 'Boxscore Results';
  offset: number = 0;
  limit: number = 500;
  columnDefs: any[];
  defaultColDef: any;
  resultsData: ORDSData = new ORDSData;
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
  menuButtonText ;

constructor(private hds: ORDSDataService) {

    // define grid columns

    this.columnDefs = [
      { headerName: 'RId', field: 'rid', hide: true },
      { headerName: 'Year', field: 'year', hide: true },
      { headerName: 'Round', field: 'round', hide: true },
      { headerName: 'A', field: 'col_1' },
      { headerName: 'B', field: 'col_2' },
      { headerName: 'C', field: 'col_3'},
      { headerName: 'D', field: 'col_4' },
      { headerName: 'E', field: 'col_5' },
      { headerName: 'F', field: 'col_6' },
      { headerName: 'G', field: 'col_7' },
      { headerName: 'H', field: 'col_8' },
      { headerName: 'I', field: 'col_9' },
      { headerName: 'J', field: 'col_10' },
      { headerName: 'K', field: 'col_11' },
      { headerName: 'L', field: 'col_12' },
      { headerName: 'M', field: 'col_13' },
      { headerName: 'N', field: 'col_14' },
      { headerName: 'O', field: 'col_15' },
      { headerName: 'P', field: 'col_16' },
      { headerName: 'Q', field: 'col_17' }
  ];

  // define default columns

  this.defaultColDef = { resizable: true, sortable: false, filter: false };

  // set the control key to use for multi-column sorting

  this.multiSortKey = 'ctrl';

  //array to hold top frozen rows

  this.pinnedTopRowData = [];


  }

  // function used in the html template code to get the years for the nested button menu (material)

  getMenuObjKeys(): Array<MyType>{
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

  // save screen to cvs file from button click

  saveToCSV() {
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
      fileName: "nunz"

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
    this.getYearRoundResultsData(newYear, newRound);
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

  async getYearRoundResultsData(year: number, round: number) {

    this.tempData.hasMore = true;
    let offset: number = this.offset;
    let limit: number = this.limit;
    let i: number = 0;

    let times: number = 0;

    while (this.tempData.hasMore && times < 10) {
      times += 1;
      this.tempData = await this.hds.getAllORDSData('RESULTSYEARROUND', offset, limit, year, round)
        .toPromise();
      if (offset > 0) {
        this.resultsData.items = this.resultsData.items.concat(this.tempData.items);
      }
      else {
        this.resultsData = this.tempData;
      }
      offset += limit;
    }
    this.pinnedTopRowData = [];
    for (i = 0; i < 3; i++) {
      this.pinnedTopRowData.push(this.resultsData.items[i]);
    }
    this.resultsData.items.splice(0, 3, 0);

  }

  
  async ngOnInit() {

//    this.getAllRusultsData();
    await this.getAllYearsRounds();
    this.getYearRoundResultsData(this.yearType, this.roundType);

  }


}

