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
      { headerName: 'A', field: 'col_1' },
      { headerName: 'B', field: 'col_2' },
      { headerName: 'C', field: 'col_3' },
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

    this.defaultColDefResults = { resizable: true, sortable: false, filter: false };


  }

  initRostersTab() {
    // define grid columns

    this.columnDefsRosters = [
      { headerName: 'RId', field: 'rid', hide: true },
      { headerName: 'Year', field: 'year', hide: true },
      { headerName: 'Round', field: 'round', hide: true },
      { headerName: 'A', field: 'a' },
      { headerName: 'B', field: 'b' },
      { headerName: 'C', field: 'c' },
      { headerName: 'D', field: 'd' },
      { headerName: 'E', field: 'e' },
      { headerName: 'F', field: 'f' },
      { headerName: 'G', field: 'g' },
      { headerName: 'H', field: 'h' },
      { headerName: 'I', field: 'i' },
      { headerName: 'J', field: 'j' },
      { headerName: 'K', field: 'k' },
      { headerName: 'L', field: 'l' },
      { headerName: 'M', field: 'm' },
      { headerName: 'N', field: 'n' },
      { headerName: 'O', field: 'o' },
      { headerName: 'P', field: 'p' },
      { headerName: 'Q', field: 'q' },
      { headerName: 'R', field: 'r' },
      { headerName: 'S', field: 's' },
      { headerName: 'T', field: 't' },
      { headerName: 'U', field: 'u' },
      { headerName: 'V', field: 'v' },
      { headerName: 'W', field: 'w' },
      { headerName: 'X', field: 'x' },
      { headerName: 'Y', field: 'y' },
      { headerName: 'Z', field: 'z' },
      { headerName: 'AA', field: 'aa' },
      { headerName: 'BB', field: 'bb' },
      { headerName: 'CC', field: 'cc' }
    ];

    // define default columns

    this.defaultColDefRosters = { resizable: true, sortable: false, filter: false };


  }

  ngOnInit() {
  }

}
