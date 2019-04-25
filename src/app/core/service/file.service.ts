import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  upload(file: File, directory: string) {

    return new Promise((resolve, reject) => {

      let date = Date.now().toString();

      let upload = firebase.storage()
        .ref().child(directory + '/' + date + '.' + file.name)
        .put(file);

      upload.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {

        console.log('Uploading ' + file.name + '…');
        
      }, (error) => {

        console.log('Error while uploading file: ' + error.message);
        reject(error);

      }, () => {

        resolve(upload.snapshot.ref.getDownloadURL());
      });
    });
  }
}
