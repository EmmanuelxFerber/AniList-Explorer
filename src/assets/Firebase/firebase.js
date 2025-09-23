import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
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

//to remove specific anime from the current user
export async function removeFavAnime(userId, animedocID) {
  try {
    await deleteDoc(doc(db, "UserInfo", userId, "favList", animedocID));
    console.log("removed from favs");
  } catch (error) {
    console.log("Error removing anime: ", error);
  }
}

export { auth };
