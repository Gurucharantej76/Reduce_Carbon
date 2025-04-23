import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential
} from "firebase/auth";

/**
 * Registers a new user with email and password.
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<User>} The newly created user object
 * @throws {Error} If signup fails
 */
export async function signupUser(email: string, password: string): Promise<User> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

/**
 * Logs in a user with email and password.
 * @param {string} email - The user's email address
 * @param {string} password - The user's password
 * @returns {Promise<User>} The logged in user object
 * @throws {Error} If login fails
 */
export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User logged in:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

/**
 * Clears the authentication token cookie.
 */
export function clearAuthToken(): void {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Secure';
}

/**
 * Signs out the current user and clears authentication data.
 * @returns {Promise<void>}
 * @throws {Error} If sign out fails
 */
export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth);
    clearAuthToken();
    console.log("User signed out");
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
}

/**
 * Gets the current authenticated user or null if not authenticated.
 * @returns {User | null} The current user or null
 */
export function getCurrentUser(): User | null {
  return auth.currentUser;
}

/**
 * Formats Firebase auth error messages to be more user-friendly.
 * @param {Error} error - The Firebase auth error
 * @returns {string} A user-friendly error message
 */
export function formatAuthError(error: any): string {
  const errorCode = error?.code as string;
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please try logging in instead.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/user-not-found":
      return "No account found with this email. Please sign up first.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again later.";
    default:
      return "An error occurred. Please try again.";
  }
}
