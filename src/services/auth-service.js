import { auth } from "../config/firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

class AuthService {
  async signInWithEmail(email, password) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    return await signInWithPopup(auth, provider);
  }

  async registerWithEmail(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  async updateUserProfile(user, profile) {
    return await updateProfile(user, profile);
  }

  async sendVerificationEmail(user) {
    return await sendEmailVerification(user);
  }

  async sendPasswordReset(email) {
    return await sendPasswordResetEmail(auth, email);
  }

  async logout() {
    return await signOut(auth);
  }

  async deleteAccount(user, password) {
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);
    return await deleteUser(user);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

export const authService = new AuthService();
