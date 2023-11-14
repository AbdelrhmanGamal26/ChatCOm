import { useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import styles from "./SideMenu.module.css";
import { useSelector } from "react-redux";

const Search = () => {
  const {
    userId: currentUserId,
    userName: currentUserName,
    userAvatar: currentUserAvatar,
  } = useSelector((state) => state.userData);

  const [friendName, setFriendName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("userName", "==", friendName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => e.code === "Enter" && handleSearch();

  const handleSelect = async () => {
    const combinedId =
      currentUserId > user.uid
        ? currentUserId + user.uid
        : user.uid + currentUserId;

    try {
      const response = await getDoc(doc(db, "chats", combinedId));

      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUserId), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            userName: user.friendName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUserId,
            userName: currentUserName,
            photoURL: currentUserAvatar,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error.code);
    }

    setFriendName("");
    setUser(null);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchFriends}
        type="search"
        placeholder="Find a user"
        value={friendName}
        onKeyDown={handleKey}
        onChange={(e) => setFriendName(e.target.value)}
      />
      {err && <p>Friend not found</p>}
      {user && (
        <div className={styles.searchedFriends} onClick={handleSelect}>
          <img
            className={styles.userAvatar}
            src={user.photoURL}
            alt="userAvatar"
          />
          <div className={styles.friendName}>
            <p className={styles.userName}>{user.userName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
