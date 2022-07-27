import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AUTH_CONFIG } from '../auth/auth0-variables';
import 'rxjs/add/operator/map';

@Injectable()
export class DownloadService {

  constructor(public authHttp: AuthHttp) { }

  requestDownload(primaryKeys) {
    return this.authHttp.put(AUTH_CONFIG.apiUrl + '/nri-nwern-rhem', primaryKeys);
  }

}
