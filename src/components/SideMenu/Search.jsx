import { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

import styles from "./SideMenu.module.css";

const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("name", "==", userName));

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

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchFriends}
        type="search"
        placeholder="Find a user"
        onKeyDown={handleKey}
        onChange={(e) => setUserName(e.target.value)}
      />
      {err && <p>Friend not found</p>}
      {user && (
        <div className={styles.searchedFriends}>
          <img
            className={styles.userAvatar}
            src={user.image}
            alt="userAvatar"
          />
          <div className={styles.friendNameAndFinalMessage}>
            <p className={styles.userName}>{user.name}</p>
            <p className={styles.finalMessage}>final message</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
