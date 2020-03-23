import {EnvironmentConfiguration} from '../EnvironmentConfiguration';

export class ImageUploadService {
  constructor() {
    baseurl = EnvironmentConfiguration.CatalogAPI_Base_URL;
    uploadEndPoint = baseurl + 'FileUpload';
  }

  uploadImage(image) {
    const formData = new FormData();
    const imageName = image.mime.replace('/', '.');
    formData.append('file', {
      uri: image.path,
      type: image.mime, // or photo.type
      name: imageName,
    });
    return fetch(uploadEndPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    }).then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw response;
      }
    });
  }
}
