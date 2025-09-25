import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDVLtVTOhc-J-9vhUfOdmMPzjELmcPKelo",
  authDomain: "van-life-7cf4f.firebaseapp.com",
  projectId: "van-life-7cf4f",
  appId: "1:1080251588665:web:e98882a5980923aa78ede8",
  measurementId: "G-PV7D03BTY1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

//to add a new anime to the user database
export async function addFavAnime(animeData, user) {
  if (!user) return;

  const userID = user.uid;
  const { title, genres, images, synopsis, score, mal_id } = animeData || {};
  const addedAt = new Date().toLocaleDateString();
  const animeToAdd = {
    title,
    genres,
    images,
    synopsis,
    score,
    mal_id,
    addedAt,
  };

  try {
    await addDoc(collection(db, "UserInfo", userID, "favList"), animeToAdd);
  } catch (error) {
    console.log("Error adding document", error);
  }
}

//to get a list of anime for current user
export async function getUserAnimeList(userId) {
  const favRef = collection(db, "UserInfo", userId, "favList");
  const snapshot = await getDocs(favRef);

  const favourites = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return favourites;
}
//to get a number of anime in their favList for current user
export async function getUserAnimeListNumber(userId) {
  const favRef = collection(db, "UserInfo", userId, "favList");
  const snapshot = await getDocs(favRef);

  const amountOfAnime = snapshot.docs.length;

  return amountOfAnime;
}

//to remove specific anime from the current user
export async function removeFavAnime(userId, animedocID) {
  try {
    await deleteDoc(doc(db, "UserInfo", userId, "favList", animedocID));
    console.log("removed from favs");
  } catch (error) {
    console.log("Error removing anime: ", error);
  }
}
//provides the firestore anime id based on its api id
export async function findAnimeById(userId, mal_id) {
  console.log("Running query for:", mal_id, "under userId:", userId);
  const favRef = collection(db, "UserInfo", userId, "favList");

  const q = query(favRef, where("mal_id", "==", mal_id));
  const snapshot = await getDocs(q);

  console.log("Query result size:", snapshot.size);

  snapshot.forEach((doc) => {
    console.log("Matching doc:", doc.id, doc.data());
  });
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return doc.id;
}

// deletes the anime based only on its api id if it exists within fav list
export async function DeleteAnimeByMal_id(userId, mal_id) {
  const animeID = await findAnimeById(userId, mal_id);

  if (animeID) {
    removeFavAnime(userId, animeID);
  } else {
    console.log("This anime is not a part of the FavList");
  }
}

//adds user data into the profile information in firebase
export async function addUserData(userID, infoToAdd) {
  try {
    await addDoc(collection(db, "UserInfo", userID, "info"), infoToAdd);
  } catch (error) {
    console.log("There was an error: ", error);
  }
}

//displays user data
export async function getUserData(userId) {
  const userRef = collection(db, "UserInfo", userId, "info");
  const snapshot = await getDocs(userRef);

  const userInfo = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return userInfo;
}

export { auth };
