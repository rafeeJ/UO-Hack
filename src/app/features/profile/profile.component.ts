import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/services/fire-layer/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private http: Http) {}

  user: User;
  rewards: Boolean = false;
  claimed: Boolean = false;
  url: any;
  cash: String;

  ngOnInit() {
    this.authService.user$.subscribe((user_input) => {
      this.user = user_input;
      this.user.points;

      if (this.user.points > 0) {
        this.rewards = true;
      }
    });
  }

  Claim() {
    this.url = this.http
      .get('http://65.52.241.124:5000/cash')
      .subscribe((data) => {
        console.log(data);
        this.cash = data.text();
        this.claimed = true;
      });
  }
}
