"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneUploader = ({ onUpload, currentImage }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-dashed border-2 p-4 text-center mb-2 rounded bg-white"
    >
      <input {...getInputProps()} />
      {currentImage ? (
        <img
          src={currentImage}
          alt="Uploaded"
          className="mx-auto h-32 object-cover"
        />
      ) : (
        <p className="text-sm text-gray-500">Drag & drop image or click to upload</p>
      )}
    </div>
  );
};

export default DropzoneUploader;
