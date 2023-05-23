import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { UsersService } from '../users.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = ['id', 'userName', 'email', 'country', 'idcard', 'address', 'birthday', 'role'];
  dataSource!: MatTableDataSource<User>;
 
  constructor(private userService: UsersService){}

  ngOnInit(): void {
    this.userService.listUsers().then((users) => {
      this.users = users;
      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
