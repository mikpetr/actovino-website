import { Injectable } from '@angular/core';
import {
  FacebookService,
  InitParams,
  LoginResponse,
  AuthResponse
} from 'ngx-facebook';

@Injectable()
export class AuthService {

  constructor(private facebookService: FacebookService) {

    let initParams: InitParams = {
      appId: '434349386764419',
      version: 'v2.8'
    };

    facebookService.init(initParams);
  }

  signInWithFacebook(): Promise<any> {

    let promise: Promise<any> = new Promise((resolve, reject) => {

      this.facebookService.login()
        .then((response: LoginResponse) => {
          let authResponse: AuthResponse = response.authResponse;

          this.facebookService.api('me?fields=id,name,email,picture')
            .then((res: any) => {
              resolve(res);

              // TODO: write user data into service

            })
            .catch((error: any) => reject(error));
        })
        .catch((error: any) => reject(error));
    });

    return promise;
  }

}
