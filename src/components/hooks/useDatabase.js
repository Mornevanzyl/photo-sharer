import { useState, useEffect } from 'react';
import { database } from '../../firebase';

export default function useDatabase(collection, user) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {

    if (user) {
      console.log(`User = ${user}`)
      const unsubscribe = database.collection(collection)
        .where("userId", "==", user)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
          });
          setDocs(documents);
        })
      return () => unsubscribe();
    } else {
      const unsubscribe = database.collection(collection)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snap) => {
          let documents = [];
          snap.forEach(doc => {
            documents.push({...doc.data(), id: doc.id});
          });
          setDocs(documents);
        })
      return () => unsubscribe();
    }

  }, [collection])

  return { docs };
};