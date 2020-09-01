import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'participativo-status-history',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.css']
})
export class StatusHistoryComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit() {
    this.data.sort((a, b) => {
      let dateA = moment(a.createdAt, 'DD-MM-YYYY H:m');
      let dateB = moment(b.createdAt, 'DD-MM-YYYY H:m');
      if (dateA.isAfter(dateB)) return -1;
      if (dateB.isAfter(dateA)) return 1;
      return 0
    })
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
