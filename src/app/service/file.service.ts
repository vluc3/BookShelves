import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class FileService {

  upload(file: File) {

    return new Promise(

      (resolve, reject) => {
        const fileName = Date.now().toString();

        const upload = firebase.storage()
          .ref().child('images/' + fileName + file.name)
          .put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Loading…');
          },
          (error) => {
            console.log('Error while loading: ' + error);
            reject(error);
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }
}
