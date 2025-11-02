import { db } from "../config/firebase-config";
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { AUTH_PROVIDERS } from "../config/constants";

class UserService {
  async saveUserData(uid, userData, isUpdate = false) {
    try {
      const data = {
        ...userData,
        ...(isUpdate ? {} : { createdAt: new Date().toISOString() }),
        updatedAt: new Date().toISOString(),
      };

      if (isUpdate) {
        await updateDoc(doc(db, "users", uid), data);
      } else {
        await setDoc(doc(db, "users", uid), {
          ...data,
          lastLogin: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error("Error saving user data:", error);
      throw error;
    }
  }

  async getUserData(uid) {
    try {
      const userDoc = await getDoc(doc(db, "users", uid));
      return userDoc.exists() ? userDoc.data() : null;
    } catch (error) {
      console.error("Error getting user data:", error);
      throw error;
    }
  }

  async updateLastLogin(uid) {
    try {
      await updateDoc(doc(db, "users", uid), {
        lastLogin: new Date().toISOString(),
      });
    } catch (error) {
      console.error("Error updating last login:", error);
    }
  }

  async deleteUserData(uid) {
    try {
      await deleteDoc(doc(db, "users", uid));
    } catch (error) {
      console.error("Error deleting user data:", error);
      throw error;
    }
  }

  createUserDataObject(
    user,
    provider = AUTH_PROVIDERS.EMAIL,
    additionalData = {}
  ) {
    return {
      fullName: user.displayName || additionalData.fullName || "",
      email: user.email || "",
      photoURL: user.photoURL || null,
      authProvider: provider,
      emailVerified: user.emailVerified || false,
      ...additionalData,
    };
  }
}

export const userService = new UserService();
