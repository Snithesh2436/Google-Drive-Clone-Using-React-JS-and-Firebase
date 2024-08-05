import React from 'react';
import pdfIcon from '../../Assets/pdf-icon.jpg'; // Verify the path
import imageIcon from '../../Assets/image-icon.png'; // Verify the path

const FilePreview = ({ file }) => {
  const fileType = file?.url?.split('.').pop();
  
  // Determine if the file is a PDF or an image
  const isPdf = fileType === 'pdf';
  const isImage = ['jpg', 'jpeg', 'png', 'gif'].includes(fileType);

  console.log('File Preview - File:', file); // Debug log
  console.log('File Type:', fileType); // Debug log
  console.log('File URL:', file.url);


  const previewStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
  };

  return (
    <div className="file-preview" style={{ display: 'flex', alignItems: 'center' }}>
      {isPdf ? (
        <img src={pdfIcon} alt="PDF Icon" style={previewStyle} />
      ) : isImage ? (
        <img src={file.url} alt="Image Preview" style={previewStyle} />
      ) : (
        <div>{file.name}</div>
      )}
    </div>
  );
};

export default FilePreview;
