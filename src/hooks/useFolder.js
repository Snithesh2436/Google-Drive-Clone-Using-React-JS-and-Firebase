import { useReducer, useEffect } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { database } from "../firebase";
import { query, where, orderBy, onSnapshot } from "firebase/firestore";

const ACTIONS = {
  SELECT_FOLDER: "select-folder",
  UPDATE_FOLDER: "update-folder",
  SET_CHILD_FOLDERS: "set-child-folders",
  SET_CHILD_FILES: "set-child-files",
};

export const ROOT_FOLDER = { name: "Root", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFiles: [],
        childFolders: [],
      };
    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };
    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };
    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };
    default:
      return state;
  }
}

export function useFolder(folderId = null, folder = null) {
  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });
  const { currentUser } = useAuth();

  // Select or update folder
  useEffect(() => {
    dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder: folder || ROOT_FOLDER } });
  }, [folderId, folder]);

  // Fetch folder data
  useEffect(() => {
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    

    const fetchFolderData = async () => {
      try {
        const folderDocRef = database.getFolderDoc(folderId);
        const docSnap = await database.getDoc(folderDocRef);
        if (docSnap.exists()) {
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: database.formatDoc(docSnap) },
          });
        } else {
          dispatch({
            type: ACTIONS.UPDATE_FOLDER,
            payload: { folder: ROOT_FOLDER },
          });
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      }
    };

    fetchFolderData();
  }, [folderId]);

  // Fetch child folders
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      database.folders,
      where("parentId", "==", folderId),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt") // Ensure this matches the field in your Firestore
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      dispatch({
        type: ACTIONS.SET_CHILD_FOLDERS,
        payload: { childFolders: snapshot.docs.map(database.formatDoc) },
      });
    });

    return unsubscribe; // Cleanup on unmount
  }, [folderId, currentUser]);

  // Fetch child files
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      database.files,
      where("folderId", "==", folderId),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, snapshot => {
      const files = snapshot.docs.map(database.formatDoc)
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles: snapshot.docs.map(database.formatDoc) },
      });
    });

    return unsubscribe; // Cleanup on unmount
  }, [folderId, currentUser]);

  return state;
}