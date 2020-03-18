import {EnvironmentConfiguration} from '../EnvironmentConfiguration';

export class CatalogDataService {
  constructor() {
    baseurl = EnvironmentConfiguration.CatalogAPI_Base_URL;
    catalogEndPoint = baseurl + 'Catalog';
  }

  getCatalogs() {
    return fetch(catalogEndPoint).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in getCatalogs. Status: ' + response.status;
      }
    });
  }

  getCatalog(id) {
    return fetch(`${catalogEndPoint}/${id}`).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in getCatalog. Status: ' + response.status;
      }
    });
  }

  addCatalog(catalog) {
    return fetch(catalogEndPoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catalog),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in addCatalog. Status: ' + response.status;
      }
    });
  }

  updateCatalog(catalog) {
    return fetch(catalogEndPoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(catalog),
    }).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw 'Error in updateCatalog. Status: ' + response.status;
      }
    });
  }

  deleteCatalog(id) {
    return fetch(`${catalogEndPoint}/${id}`, {
      method: 'DELETE',
    }).then(response => {
      if (response.ok) {
        return response.body;
      } else {
        throw 'Error in deleteCatalog. Status: ' + response.status;
      }
    });
  }
}
