import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { Link } from 'react-router-dom';

export default function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  const breadcrumbStyle = {
    display: 'flex',
    flexGrow: 1,
    margin: 0,
    padding: 0
  };

  const breadcrumbItemStyle = {
    maxWidth: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  };

  return (
    <Breadcrumb style={breadcrumbStyle} listProps={{ className: "bg-white p-0" }}>
      {path.map((folder, index) => (
        <Breadcrumb.Item
          key={folder.id}
          linkAs={Link}
          linkProps={{
            to: {
              pathname: folder.id ? `/folder/${folder.id}` : "/",
              state: { folder: { ...folder, path: path.slice(1, index) } }
            }
          }}
          style={breadcrumbItemStyle}
        >
          {folder.name}
        </Breadcrumb.Item>
      ))}
      {currentFolder && (
        <Breadcrumb.Item
          style={{ ...breadcrumbItemStyle, maxWidth: '200px' }}
          active
        >
          {currentFolder.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
}
