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
  pageSizeOptions = [25, 50, 100];
  page: { limit: number, offset: number } = { limit: this.pageSizeOptions[0], offset: 0 };
  /**
   *
   */
  constructor(private api: ApiService, private router: Router) {
    this.dataSource = new MatTableDataSource<User>();

  }
  //keyup.enter
  //evento para filtrado

  ngOnInit() {
    this.table()
  }

  table() {


    this.api.getUsers(this.page).subscribe(
      {
        next:(data: { users: User[]; total_count: number }) => {
          this.length = data.total_count;
          this.dataSource = new MatTableDataSource<User>(data.users);
        },
        error:()=>{
          console.log('logout');
          this.router.navigate(['/login']);
          
        }
      }
      
    )
  }

  changePage(newPage: PageEvent): void {
    // this.pageSize = newPage.pageSize;
    this.page = { limit: newPage.pageSize, offset: newPage.pageSize * newPage.pageIndex }
    console.log(newPage);
    this.table();
  }
}
