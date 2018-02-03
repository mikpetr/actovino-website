import { Injectable } from '@angular/core';
import {
  FacebookService,
  InitParams,
  LoginResponse,
  AuthResponse
} from 'ngx-facebook';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthService {

  private userData: Object;

  constructor(private facebookService: FacebookService) {

    let initParams: InitParams = {
      appId: '434349386764419',
      version: 'v2.8'
    };

    facebookService.init(initParams);
  }

  signInWithFacebook(): Promise<Object> {
    return this.facebookService.login();
  }

  checkFacebookLoginStatus(): Promise<Object> {
    return this.facebookService.getLoginStatus();
  }

  // Make sure to connected with facebook
  connectWithFacebook(): Promise<Object> {
    let promise: Promise<Object> = new Promise((resolve, reject) => {

      this.checkFacebookLoginStatus()
        .then((response: LoginResponse) => {

          if (response.status === 'connected') {
            resolve(response);
          } else {
            this.signInWithFacebook().then((response: LoginResponse) => {
              resolve(response);
            })
            .catch((error: any) => reject(error));
          }
        });

    });

    return promise;
  }

  loadUserDataFromFacebook(): Promise<Object> {

    let promise: Promise<Object> = new Promise((resolve, reject) => {
      this.connectWithFacebook()
        .then(() => {
          this.facebookService.api('me?fields=id,name,email,picture')
            .then((res: Object) => {
              this.userData = res;
              resolve(this.userData);
            })
            .catch((error: any) => reject(error));
        })
        .catch((error: any) => reject(error));
    });

    return promise;
  }

  getUserData(): Observable<Object> {

    if (this.userData)
      return of(this.userData);

    // Load data if not exists
    return fromPromise(this.loadUserDataFromFacebook());
  }

}
