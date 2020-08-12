import { encode } from "ngeohash";
import { nanoid } from "nanoid/non-secure";

export const getPostsWithinGeohash = async (db, geohash, { onNext, onError }) => db.collection('posts')
  .where("location.geohash", ">=", geohash)
  .where("location.geohash", "<", geohash + "~")
  .limit(100)
  .onSnapshot({
    next: snapshot => onNext(snapshot.docs.map(doc => ({
      id: doc.id,
      data: doc.data()
    }))),
    error: onError
  });

export const createPost = async (db, { title, uri, coordinate }) => db.collection("posts").add({
  title,
  uri,
  location: {
    coordinate,
    geohash: encode(coordinate.latitude, coordinate.longitude, 12)
  }
})

export const uploadToPhotosBucket = async (storage, uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  const storageRef = storage.ref(`photos/${nanoid()}`);
  await storageRef.put(blob);
  await blob.close();
  return await storageRef.getDownloadURL();
}