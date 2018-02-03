import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  public userData: Object;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserData()
      .subscribe(userData => this.userData = userData);
  }

}
