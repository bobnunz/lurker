import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-dialog-save-to-csv',
  templateUrl: './dialog-save-to-csv.component.html',
  styleUrls: ['./dialog-save-to-csv.component.css']
})
export class DialogSaveToCSVComponent implements OnInit {

  filename: string;

  constructor(public dialogRef: MatDialogRef<DialogSaveToCSVComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.filename = data.filename;
  }

  closeSave() {
    this.dialogRef.close(this.filename);
  }

  closeCancel() {
    this.dialogRef.close();
  }


  ngOnInit() {
  }

}
