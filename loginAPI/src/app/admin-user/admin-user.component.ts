import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api/api.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

export interface User {
  email: string;
  id: string;
  last_name: string;
  name: string;
  permissions: string[];
  retails: string[];
  companies_ids: any[];
}
@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {
  displayedColumns: string[] = ['email', 'name', 'id'];
  dataSource: any;
  length = 0;
  pageIndex = 0;
  pageSizeOptions = [25, 50, 100];
  pageSize = this.pageSizeOptions[0];
  response = 'ok';
  /**
   *
   */
  constructor(private api: ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<User>();

  }

  ngOnInit() {
    this.table()
  }

  table(lengthOption = this.pageSize) {

    let params = 'limit=' + lengthOption;
    this.api.getUsers(params).subscribe(
      // data => {
      //   console.log(data.status);
  
        (data: { users: User[]; total_count: number }) => {
          // (data) => {
          this.length = data.total_count;
          this.dataSource = new MatTableDataSource<User>(data.users);
            // this.dataSource.data = data.users.map((user) => {
            // return user;
            // })
            console.log(this.dataSource);
  
        }
      // }
    )
  }

  changePage(newPage: PageEvent): void {
    this.pageSize = newPage.pageSize;
    this.table();
  }
}
