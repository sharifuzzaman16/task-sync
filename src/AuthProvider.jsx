import { createContext, useContext, useEffect, useState } from "react";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  GoogleAuthProvider, 
  signInWithPopup, 
  updateProfile
} from "firebase/auth";
import { auth } from "./firebase.config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Register user and update profile
  const register = (email, password, name, photoURL) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        return updateProfile(user, {
          displayName: name,
          photoURL: photoURL
        }).then(() => {
          // Update state after profile update
          setUser({ ...user, displayName: name, photoURL: photoURL });
        });
      });
  };

  // Login user
  const login = (email, password) => signInWithEmailAndPassword(auth, email, password);

  // Logout user
  const logout = () => signOut(auth);

  // Google Sign-In
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, googleSignIn }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
