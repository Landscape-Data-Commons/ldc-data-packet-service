interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
  // 2022-07-16-CMF: silentCallbackURL: string;
  audience: string;
  apiUrl: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'PBjfL3BBfTat7J9LrDHbmGjd1ltqq3kv',
  domain: 'dev-79gfl7zq.us.auth0.com',
  // 2022-07-16-CMF: callbackURL: 'http://localhost:4200/callback',
  callbackURL: 'http://localhost:4210/',
  // 2022-07-16-CMF: silentCallbackURL: 'http://localhost:3002/silent',
  audience: 'http://localhost:3002',
  apiUrl: 'http://localhost:8090'
};
