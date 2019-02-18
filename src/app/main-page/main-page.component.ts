import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  columnDefsResults: any[];
  defaultColDefResults: any;
  columnDefsRosters: any[];
  defaultColDefRosters: any;

  constructor() {
    this.initResultsTab();
    this.initRostersTab();
  }


  initResultsTab() {
    // define grid columns

    this.columnDefsResults = [
      { headerName: 'RId', field: 'rid', hide: true },
      { headerName: 'Year', field: 'year', hide: true },
      { headerName: 'Round', field: 'round', hide: true },
      { headerName: 'A', field: 'col_1' , width: 300, pinned: 'left'},
      { headerName: 'B', field: 'col_2' , width: 65},
      { headerName: 'C', field: 'col_3', width: 100 },
      { headerName: 'D', field: 'col_4', width: 100 },
      { headerName: 'E', field: 'col_5', width: 100 },
      { headerName: 'F', field: 'col_6', width: 100},
      { headerName: 'G', field: 'col_7', width: 100 },
      { headerName: 'H', field: 'col_8', width: 100 },
      { headerName: 'I', field: 'col_9', width: 100 },
      { headerName: 'J', field: 'col_10', width: 100 },
      { headerName: 'K', field: 'col_11', width: 100},
      { headerName: 'L', field: 'col_12', width: 100 },
      { headerName: 'M', field: 'col_13', width: 100 },
      { headerName: 'N', field: 'col_14', width: 100 },
      { headerName: 'O', field: 'col_15', width: 100 },
      { headerName: 'P', field: 'col_16', width: 100 },
      { headerName: 'Q', field: 'col_17', width: 140}
    ];

    // define default columns

    this.defaultColDefResults = { resizable: true, sortable: false, filter: false };


  }

  initRostersTab() {
    // define grid columns

    this.columnDefsRosters = [
      { headerName: 'RId', field: 'rid', hide: true },
      { headerName: 'Year', field: 'year', hide: true },
      { headerName: 'Round', field: 'round', hide: true },
      { headerName: 'A', field: 'a', width: 150, pinned: 'left' },
      { headerName: 'B', field: 'b', width: 200 },
      { headerName: 'C', field: 'c', width: 50},
      { headerName: 'D', field: 'd', width: 200 },
      { headerName: 'E', field: 'e', width: 50 },
      { headerName: 'F', field: 'f', width: 200 },
      { headerName: 'G', field: 'g', width: 50},
      { headerName: 'H', field: 'h', width: 200},
      { headerName: 'I', field: 'i', width: 50},
      { headerName: 'J', field: 'j', width: 200 },
      { headerName: 'K', field: 'k', width: 50 },
      { headerName: 'L', field: 'l', width: 200 },
      { headerName: 'M', field: 'm', width: 50 },
      { headerName: 'N', field: 'n', width: 200 },
      { headerName: 'O', field: 'o', width: 50 },
      { headerName: 'P', field: 'p', width: 200 },
      { headerName: 'Q', field: 'q', width: 50 },
      { headerName: 'R', field: 'r', width: 200},
      { headerName: 'S', field: 's', width: 50 },
      { headerName: 'T', field: 't', width: 200 },
      { headerName: 'U', field: 'u', width: 50 },
      { headerName: 'V', field: 'v', width: 200 },
      { headerName: 'W', field: 'w', width: 50 },
      { headerName: 'X', field: 'x', width: 200 },
      { headerName: 'Y', field: 'y', width: 50 },
      { headerName: 'Z', field: 'z', width: 200 },
      { headerName: 'AA', field: 'aa', width: 50 },
      { headerName: 'BB', field: 'bb', width: 200 },
      { headerName: 'CC', field: 'cc', width: 50 }
    ];

    // define default columns

    this.defaultColDefRosters = { resizable: true, sortable: false, filter: false };


  }

  ngOnInit() {
  }

}
