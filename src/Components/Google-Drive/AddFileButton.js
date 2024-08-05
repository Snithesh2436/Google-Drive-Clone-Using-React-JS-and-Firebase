import React, { useState } from 'react';
import { Button, Modal, Form, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { storage, firestore, database } from '../../firebase';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../Contexts/AuthContext';

export default function AddFileButton({ currentFolder, onClose }) {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const { currentUser } = useAuth();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    
    if (selectedFile) {
      const fileType = selectedFile.type;
      if (fileType.startsWith('image/')) {
        setPreview(URL.createObjectURL(selectedFile));
      } else if (fileType === 'application/pdf') {
        setPreview('/path/to/pdf-preview.png'); // Placeholder image
      } else {
        setPreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (file == null || currentFolder == null || !currentUser) return;

    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error('Error uploading file:', error);
        setUploading(false);
      },
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        const q = query(
          collection(firestore, 'files'),
          where("name", "==", file.name),
          where("userId", "==", currentUser.uid),
          where("folderId", "==", currentFolder.id)
        );
        
        const querySnapshot = await getDocs(q);
        const existingFile = querySnapshot.docs[0];
        if (existingFile) {
          await existingFile.ref.update({ url: url });
        } else {
          await addDoc(collection(firestore, 'files'), {
            url: url,
            name: file.name,
            createdAt: serverTimestamp(),
            folderId: currentFolder.id,
            userId: currentUser.uid,
          });
        }

        setUploading(false);
        setPreview(null);
        setFile(null);
        onClose();
      }
    );
  };

  return (
    <Modal show onHide={onClose}>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Upload File</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="mt-3">
              {file && file.type.startsWith('image/') && (
                <img src={preview} alt="File Preview" style={{ width: '100%', height: 'auto' }} />
              )}
              {file && file.type === 'application/pdf' && (
                <img src={preview} alt="PDF Preview" style={{ width: '100px', height: 'auto' }} />
              )}
            </div>
          )}
          {uploading && (
            <div className="mt-3">
              <ProgressBar now={uploadProgress} label={`${Math.round(uploadProgress)}%`} />
            </div>
          )}
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="success"
          onClick={handleUpload}
          disabled={uploading || !file}
        >
          <FontAwesomeIcon icon={faFileUpload} className="me-2" />
          {uploading ? 'Uploading...' : 'Upload File'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
