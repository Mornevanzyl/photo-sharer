import { useState, useEffect, useContext } from 'react';
import firebase from "firebase/app";
import app from '../../firebase';
import { AuthContext } from '../authentication/AuthContext';

export default function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const { currentUser } = useContext(AuthContext);


  const storage = app.storage();
  const database = app.firestore();
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;

  useEffect(() => {
    const storageRef = storage.ref(file.name);
    const collectionRef = database.collection('images');

    storageRef.put(file).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      collectionRef.add({
        url: url,
        userId: currentUser.uid,
        createdAt: timestamp()
      });
      setUrl(url);
    })
  }, [file, currentUser])

  return { progress, url, error }
}
