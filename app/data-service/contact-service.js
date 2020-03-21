import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import {DataCache} from '../data-service/cache-service';

export class ContactService {
  constructor() {
    baseurl = EnvironmentConfiguration.CatalogAPI_Base_URL;
    contactEndPoint = baseurl + 'contact';
  }

  getContact() {
    return new Promise((resolve, reject) => {
      fetch(contactEndPoint)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            DataCache.getItem(contactEndPoint, function(err, value) {
              if (value) {
                resolve(JSON.parse(value));
              } else {
                reject('Error in getContact. Status: ' + response.status);
              }
            });
          }
        })
        .then(result => {
          DataCache.setItem(contactEndPoint, JSON.stringify(result), function(
            _,
          ) {});
          resolve(result);
        })
        .catch(error => {
          DataCache.getItem(contactEndPoint, function(err, value) {
            if (value) {
              resolve(JSON.parse(value));
            } else {
              reject('Error in getContact.');
            }
          });
        });
    });
  }

  addContact(contact) {
    return fetch(contactEndPoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in addContact. Status: ' + response.status;
      }
    });
  }

  updateContact(contact) {
    return fetch(contactEndPoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in updatecontact. Status: ' + response.status;
      }
    });
  }
}
