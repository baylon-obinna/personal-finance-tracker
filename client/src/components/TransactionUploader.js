import React from 'react';
import './TransactionUploader.css';

const TransactionUploader = ({ onUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <input type="file" accept=".csv" onChange={handleFileChange} />
  );
};

export default TransactionUploader;
