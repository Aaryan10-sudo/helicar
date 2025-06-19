"use client";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropzoneUploader = ({ onUpload, currentImage, isUploading }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
    [onUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      {isUploading ? (
        <div className="flex items-center justify-center h-24">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
        </div>
      ) : (
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
            <p className="text-sm text-gray-500">
              Drag & drop image or click to upload
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default DropzoneUploader;
