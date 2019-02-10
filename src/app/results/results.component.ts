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
  [key: number]: any;
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
  multiSortKey;
  private gridApi;
  private gridColumnApi;
  private heightPx: number;
  private yearType: number = 2019;
  private pinnedTopRowData;
  private menuObj: MyType = {};




constructor(private hds: ORDSDataService) {

    // define grid columns

    this.columnDefs = [
      { headerName: 'RId', field: 'rid', hide: true },
      { headerName: 'Year', field: 'year', hide: true },
      { headerName: 'Round', field: 'round', hide: true },
      { headerName: 'A', field: 'col_1', rowDrag: true, suppressMovable: true },
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

  this.defaultColDef = { resizable: true, sortable: true, filter: true };
  this.multiSortKey = 'ctrl';




  

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  autoSize(params) {
    var allColumnIds = [];
    this.gridColumnApi.getAllColumns().forEach(function (column) {
      allColumnIds.push(column.colId);
    });
    this.gridColumnApi.autoSizeColumns(allColumnIds);
  }
  


  onGridReady(params) {
    let allColumnIds = [];

    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

  }
  saveToCSV() {
    let params = {
      skipHeader: true,
      columnGroups: false,
      skipFooters: true,
      skipGroups: true,
      skipPinnedTop: true,
      skipPinnedBottom: true,
      allColumns: true,
      onlySelected: false,
      suppressQuotes: false,
      fileName: "nunz"

    };
//    console.log("inside export");
    this.gridApi.exportDataAsCsv(params);

  }

  isExternalFilterPresent (): boolean {
  return true;
}

  doesExternalFilterPass = (node: RowNode): boolean => {

    switch (this.yearType) {
      case 2019: return node.data.year == 2019 && node.data.round == 1;
      case 2018: return node.data.year == 2018 && node.data.round == 1;
      case 2017: return node.data.year == 2017 && node.data.round == 1;
      case 2016: return node.data.year == 2016 && node.data.round == 1;
      case 2015: return node.data.year == 2015 && node.data.round == 1;
      default: return true;
    }
  }

  externalFilterChanged(newValue) {
//    console.log('inside externalFil...' + newValue);
    this.yearType = newValue;
    this.gridApi.onFilterChanged();
  }

  async getRusultsData(year: number, round: number) {
    this.tempData.hasMore = true;
    let offset: number = this.offset;
    let limit: number = this.limit;

    let times: number = 0;

    while (this.tempData.hasMore && times < 10) {
      times += 1;
      this.tempData = await this.hds.getAllORDSData('RESULTSALL', offset, limit, year, round)
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

  async getAllYearsRounds() {

    let offset: number = 0;
    let limit: number = 500;

    let times: number = 0;

    
    this.yearRoundData = await this.hds.getAllORDSData('YEARSROUNDS', 0, 500, 0, 0)
      .toPromise();
    for (let value of this.yearRoundData.items) {
      if (this.menuObj[value.year] === undefined) {
        this.menuObj[value.year] = [];
      }
      this.menuObj[value.year].push(value.round);
    }
  
  }

  
  async ngOnInit() {

    this.getRusultsData(2019, 1);
    await this.getAllYearsRounds();
  }


}
