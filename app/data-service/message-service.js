import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import {DataCache} from '../data-service/cache-service';

export class MessageService {
  constructor() {
    baseurl = EnvironmentConfiguration.CatalogAPI_Base_URL;
    messageEndPoint = baseurl + 'message';
  }

  getMessages() {
    return new Promise((resolve, reject) => {
      fetch(messageEndPoint)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            DataCache.getItem(messageEndPoint, function(err, value) {
              if (value) {
                resolve(JSON.parse(value));
              } else {
                reject('Error in getMessage. Status: ' + response.status);
              }
            });
          }
        })
        .then(result => {
          DataCache.setItem(messageEndPoint, JSON.stringify(result), function(
            _,
          ) {});
          resolve(result);
        })
        .catch(error => {
          DataCache.getItem(messageEndPoint, function(err, value) {
            if (value) {
              resolve(JSON.parse(value));
            } else {
              reject('Error in getMessages.');
            }
          });
        });
    });
  }

  addMessage(message) {
    return fetch(messageEndPoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in addMessage. Status: ' + response.status;
      }
    });
  }
}
