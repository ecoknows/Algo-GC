import { LogBox } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyAPeHLcr27WVns4pgUai0EgpC2VvOlGQ4w",
    authDomain: "algo-gc-1a16e.firebaseapp.com",
    projectId: "algo-gc-1a16e",
    storageBucket: "algo-gc-1a16e.appspot.com",
    messagingSenderId: "285627915579",
    appId: "1:285627915579:web:05fd9413a846edc4abeb1e"
  };
export function InitializeFirebase(){
    LogBox.ignoreLogs(['Setting a timer'])
    if(firebase.apps.length === 0)
      firebase.initializeApp(firebaseConfig);
}


export function firebase_listen_message(collection, func){
    firebase.firestore()
            .collection(collection)
            .onSnapshot(QuerySnapshot =>{
                let arr = [];
                QuerySnapshot.forEach(documentSnapshot => {
                    arr.push(documentSnapshot.data())
                });
                func(arr);
            });
}
export function firebase_add_message( collection , message){
    const date = new Date().toString();
    firebase.firestore()
    .collection(collection)
    .doc(date)
    .set(message)
}