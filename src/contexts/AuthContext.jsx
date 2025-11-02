import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase-config";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = useCallback(async (user) => {
    if (!user) return null;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const data = userDoc.exists() ? userDoc.data() : null;
      return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
        ...data,
      };
    } catch (error) {
      console.error("Error getting user data:", error);
      return {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        displayName: user.displayName,
        photoURL: user.photoURL,
      };
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      const data = await fetchUserData(user);
      setCurrentUser(user);
      setUserData(data);
    }
  }, [fetchUserData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const data = await fetchUserData(user);
        setUserData(data);
      } else {
        setCurrentUser(null);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [fetchUserData]);

  const value = {
    currentUser,
    userData,
    loading,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
