import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private router: Router
  ) {
    iconRegistry.addSvgIcon(
      'facebook',
      sanitizer.bypassSecurityTrustResourceUrl('./assets/facebook-app-symbol.svg')
    );
  }

  ngOnInit() {
  }

  signIn(): void {
    this.authService.signInWithFacebook()
      .then((data: any) => {
        this.router.navigateByUrl('/dashboard');
      })
      .catch((error: any) => {
        console.log('Failed to sign in!');
      });
  }

}
