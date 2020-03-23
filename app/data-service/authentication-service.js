import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import {DataCache} from './cache-service';

export class AuthenticationService {
  constructor() {
    adminUserStorageKey = 'AdminUserStorageKey1';
    baseurl = EnvironmentConfiguration.CatalogAPI_Base_URL;
    authEndPoint = baseurl + 'authentication';
  }

  authenticate(password) {
    return new Promise((resolve, reject) => {
      if (password === 'akhtar') {
        DataCache.setItem(adminUserStorageKey, true, function(_) {});
        resolve(true);
      } else {
        resolve(false);
      }
      //   fetch(authEndPoint)
      //     .then(response => {
      //       if (response.ok) {
      //         return response.text();
      //       } else {
      //         resolve(false);
      //       }
      //     })
      //     .then(result => {
      //       DataCache.setItem(adminUserStorageKey, result, function(_) {});
      //       resolve(true);
      //     })
      //     .catch(error => {
      //       reject('Error in authentication.');
      //     });
    });
  }

  isAdminUser() {
    return new Promise((resolve, _) => {
      DataCache.getItem(adminUserStorageKey, function(err, value) {
        if (value) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
}
