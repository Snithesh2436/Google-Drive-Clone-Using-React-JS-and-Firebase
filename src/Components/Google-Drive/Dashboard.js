import React, { useState, useEffect } from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faTh, faFolder, faFile } from '@fortawesome/free-solid-svg-icons';
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddButton from "./AddButton";
import Sidebar from "./Sidebar";
import NavbarComponent from "./Navbar"; 
import { useFolder } from "../../hooks/useFolder";
import { useParams, useLocation } from "react-router-dom";
import GridLayout from './GridLayout';
import ListLayout from './ListLayout';
import { renameFolder, renameFile, deleteFolder, deleteFile } from '../../firebase';
import './Dashboard.css';

export default function Dashboard() {
  const { folderId } = useParams();
  const { state } = useLocation();
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);
  const [activeView, setActiveView] = useState("folders");
  const [activeLayout, setActiveLayout] = useState("list");

  const { folder, childFolders, childFiles } = useFolder(folderId, state?.folder || null);

  useEffect(() => {
    if (folderId === undefined) {
      setFolders(childFolders);
      setFiles(childFiles);
    }
  }, [folderId, childFolders, childFiles]);

  const handleRename = async (itemId, newName) => {
    if (activeView === "folders") {
      await renameFolder(itemId, newName);
    } else {
      await renameFile(itemId, newName);
    }
  };

  const handleDelete = async (itemId) => {
    if (activeView === "folders") {
      await deleteFolder(itemId);
    } else {
      await deleteFile(itemId);
    }
  };

  return (
    <>
      <NavbarComponent />
      <Container fluid>
        <div className="dashboard-container">
          <div className="sidebar-and-addbutton-container">
            <AddButton currentFolder={folder} />
            <Sidebar />
          </div>
          <div className="content-container">
            <div className="dashboard-header">
              <div className="welcome-message">Welcome to Drive</div>
            </div>
            <FolderBreadcrumbs currentFolder={folder} />
            <div className="d-flex justify-content-between align-items-center my-2">
              <ButtonGroup>
                <Button onClick={() => setActiveView("folders")} active={activeView === "folders"}>
                  <FontAwesomeIcon icon={faFolder} />
                  <span className="ms-2">Folders</span>
                </Button>
                <Button onClick={() => setActiveView("files")} active={activeView === "files"}>
                  <FontAwesomeIcon icon={faFile} />
                  <span className="ms-2">Files</span>
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button onClick={() => setActiveLayout("list")} active={activeLayout === "list"}>
                  <FontAwesomeIcon icon={faList} />
                </Button>
                <Button onClick={() => setActiveLayout("grid")} active={activeLayout === "grid"}>
                  <FontAwesomeIcon icon={faTh} />
                </Button>
              </ButtonGroup>
            </div>
            {activeLayout === "list" ? (
              <ListLayout
                items={activeView === "folders" ? folders : files}
                isFolder={activeView === "folders"}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            ) : (
              <GridLayout
                items={activeView === "folders" ? folders : files}
                isFolder={activeView === "folders"}
                onRename={handleRename}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      </Container>
      <footer className="footer">
        <p>Copyright &copy; Snithesh 2024</p>
      </footer>
    </>
  );
}
