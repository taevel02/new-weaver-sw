import firebase from 'firebase';

let config = {
  apiKey: 'AIzaSyCet5FFchYI2P56oJMro7saNkkycH_YXLk',
  authDomain: 'library-new-weaver.firebaseapp.com',
  databaseURL: 'https://library-new-weaver.firebaseio.com',
  projectId: 'library-new-weaver',
  storageBucket: 'library-new-weaver.appspot.com',
  messagingSenderId: '578866059464'
};

let app = firebase.initializeApp(config);

export const db = app.database();