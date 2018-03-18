import { initializeApp } from "firebase"

const app = initializeApp({
   apiKey: "AIzaSyBWx7wIHxdRpTKDuH406bfn6A4GHwoBuCs",
    authDomain: "meetingsvue.firebaseapp.com",
    databaseURL: "https://meetingsvue.firebaseio.com",
    projectId: "meetingsvue",
    storageBucket: "meetingsvue.appspot.com",
    messagingSenderId: "411812664348"
  });


export const db = app.database();
export const namesRef = db.ref("films")