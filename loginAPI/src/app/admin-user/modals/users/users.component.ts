import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  /**
   *
   */
  constructor(public dialogRef: MatDialogRef<UsersComponent>, @Inject(MAT_DIALOG_DATA) private miData: {id: string}) {
    console.log(miData);
    
  }
}
