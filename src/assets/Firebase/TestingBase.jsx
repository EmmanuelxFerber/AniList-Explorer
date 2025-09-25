import { useAuth } from "../Context/AuthContext";
import { findAnimeById } from "./firebase";

export default function TestingBase() {
  const { user } = useAuth();

  async function startTest() {
    const userID = user.uid;
    const data = await findAnimeById(userID, 26197);
    console.log(data);
  }

  return <button onClick={startTest}>Test</button>;
}
