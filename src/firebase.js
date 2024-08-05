import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, getDoc, query, where, onSnapshot, addDoc, serverTimestamp, updateDoc, deleteDoc, orderBy, getDocs } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAG6WulWBnKn27CJN8gpCzsf1kuT6dknt0",
  authDomain: "auth-dev-d6c41.firebaseapp.com",
  projectId: "auth-dev-d6c41",
  storageBucket: "auth-dev-d6c41.appspot.com",
  messagingSenderId: "646201433373",
  appId: "1:646201433373:web:bef2145b48b62a63b015f4"
};

let app;

if (!getApps().length) {
  try {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully");
  } catch (error) {
    console.error("Firebase initialization error", error);
  }
} else {
  app = getApp();
}

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export const database = {
  folders: collection(firestore, "folders"),
  files: collection(firestore, "files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getFolderDoc: (folderId) => doc(firestore, "folders", folderId),
  getFileDoc: (fileId) => doc(firestore, "files", fileId),
  getDoc: async (docRef) => {
    const docSnap = await getDoc(docRef);
    return docSnap;
  },
  getQuery: (collectionRef, ...constraints) => {
    return query(collectionRef, ...constraints);
  },
  onSnapshot: (query, callback) => {
    return onSnapshot(query, callback);
  },
  addDoc: (collectionRef, data) => {
    return addDoc(collectionRef, data);
  },
  getCurrentTimestamp: () => {
    return serverTimestamp();
  }
};

export const renameFolder = async (folderId, newName) => {
  const folderRef = doc(firestore, 'folders', folderId);
  return updateDoc(folderRef, { name: newName });
};

export const renameFile = async (fileId, newName) => {
  const fileRef = doc(firestore, 'files', fileId);
  return updateDoc(fileRef, { name: newName });
};

export const deleteFolder = async (folderId) => {
  const folderRef = doc(firestore, 'folders', folderId);
  return deleteDoc(folderRef);
};

export const deleteFile = async (fileId) => {
  const fileRef = doc(firestore, 'files', fileId);
  return deleteDoc(fileRef);
};

export const getRecentFiles = async () => {
  const recentFilesQuery = query(collection(firestore, 'files'), orderBy('createdAt', 'desc'));
  const querySnapshot = await getDocs(recentFilesQuery);
  return querySnapshot.docs.map(database.formatDoc);
};

export const getBinItems = async () => {
  const binFilesQuery = query(collection(firestore, 'files'), where('inBin', '==', true));
  const querySnapshot = await getDocs(binFilesQuery);
  return querySnapshot.docs.map(database.formatDoc);
};

export default app;
