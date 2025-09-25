import { useAuth } from "../../Context/AuthContext";
import { getUserData, getUserAnimeListNumber } from "../../Firebase/firebase";
import React from "react";

export default function Dashboard() {
  const { user } = useAuth();
  const [userInfo, setUserInfo] = React.useState(null);
  const [animeNumber, setAnimeNumber] = React.useState(null);

  React.useEffect(() => {
    async function getData() {
      const data = await getUserData(user.uid);
      setUserInfo(data[0]);
      const animeData = await getUserAnimeListNumber(user.uid);
      setAnimeNumber(animeData);
    }

    getData();
  }, []);
  const { userName, dateRegistered } = userInfo ? userInfo : "nothing";
  return (
    <>
      <h1>Username: {userName}</h1>
      <p>With us since: {dateRegistered}</p>
      <p>You have {animeNumber} anime in your Fav list</p>
    </>
  );
}
