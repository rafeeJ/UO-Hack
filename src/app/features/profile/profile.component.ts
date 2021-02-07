import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { User } from 'src/app/services/fire-layer/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService) {}

  user: User;

  ngOnInit() {
    this.authService.user$.subscribe((user_input) => {
      this.user = user_input;
    });
  }
}
