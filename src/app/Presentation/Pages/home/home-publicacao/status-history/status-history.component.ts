import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'participativo-status-history',
  templateUrl: './status-history.component.html',
  styleUrls: ['./status-history.component.css']
})
export class StatusHistoryComponent implements OnInit {

  constructor(private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }
}
