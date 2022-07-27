import { Injectable } from '@angular/core';
import { AUTH_CONFIG } from './auth0-variables';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/filter';
import auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  userProfile: any;
  refreshSubscription: any;
  // 2022-07-04-CMF: Change to LDC restricted-data scopes
  // requestedScopes: string = 'openid profile read:timesheets create:timesheets';
  requestedScopes: string = 'read:NRI read:NWERN read:RHEM';

  auth0WebAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.clientID,
    domain: AUTH_CONFIG.domain,
    responseType: 'token id_token',
    audience: AUTH_CONFIG.audience,
    redirectUri: AUTH_CONFIG.callbackURL,
    scope: this.requestedScopes,
    leeway: 30
  });

  constructor(public router: Router) { }

  public login(): void {
    this.auth0WebAuth.authorize();
  }

  public handleAuthentication(): void {
    this.auth0WebAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        // 2022-07-24-CMF: this.router.navigate(['/home']);
      } else if (err) {
        // 2022-07-24-CMF: this.router.navigate(['/home']);
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

    // If there is a value on the `scope` param from the authResult,
    // use it to set scopes in the session for the user. Otherwise
    // use the scopes as requested. If no scopes were requested,
    // set it to nothing
    const scopes = authResult.scope || this.requestedScopes || '';
    console.log('scopes', scopes)
    console.log('authResult: ', authResult)
    console.log(localStorage.getItem('access_token'))
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    this.unscheduleRenewal();
    // Go back to the home route
    //this.router.navigate(['/']);
    //auth0.logout();
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public userHasScopes(scopes: Array<string>): boolean {
    console.log(localStorage.getItem('scopes'))
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

  public renewToken() {
    this.auth0WebAuth.renewAuth({
      audience: AUTH_CONFIG.audience,
      //CMF redirectUri: AUTH_CONFIG.silentCallbackURL,
      usePostMessage: true
    }, (err, result) => {
      if (err) {
        //alert(`Could not get a new token using silent authentication (${err.error}).`);
      } else {
        //alert(`Successfully renewed auth!`);
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) return;

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const source = Observable.of(expiresAt).flatMap(
      expiresAt => {

        const now = Date.now();

        // Use the delay in a timer to
        // run the refresh at the proper time
        var refreshAt = expiresAt - (1000 * 30); // Refresh 30 seconds before expiry
        return Observable.timer(Math.max(1, refreshAt - now));
      });

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSubscription = source.subscribe(() => {
      //CMF this.renewToken();
    });
  }

  public unscheduleRenewal() {
    if (!this.refreshSubscription) return;
    this.refreshSubscription.unsubscribe();
  }
}

