import { Component, OnInit } from '@angular/core';
import { FireLayerService } from '../../services/fire-layer/fire-layer.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { User } from 'src/app/services/fire-layer/user';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss'],
})
export class LeaderboardComponent implements OnInit {
  constructor(private fireService: FireLayerService) {}

  displayedColumns = ['img', 'displayName', 'points'];
  users: any = [];
  dataSource: MatTableDataSource<User>;

  ngOnInit() {
    this.fireService.getAllUsers().subscribe((data: any) => {
      if (data) {
        data.forEach((user: any) => {
          this.users.push(user.data());
        })
        this.dataSource = new MatTableDataSource<User>(this.users.slice(0, 10));
      }
    });
  }
}
