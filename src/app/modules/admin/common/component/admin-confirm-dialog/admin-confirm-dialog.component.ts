import { Component, Inject, OnInit } from '@angular/core';
import { MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
  selector: 'app-admin-confirm-dialog',
  templateUrl: './admin-confirm-dialog.component.html',
  styleUrls: ['./admin-confirm-dialog.component.scss']
})
export class AdminConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
