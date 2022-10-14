import React, { useState, useEffect } from "react";
import { uploadFile } from "react-s3";
import useAuthContext from "../hooks/useAuthContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function SendImage() {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // eslint-disable-next-line consistent-return
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => {
        console.log(data.location);
        // send data.location to server
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      {selectedFile ? (
        <button type="button" onClick={() => setSelectedFile(null)}>
          Remove
        </button>
      ) : (
        <button type="button">Go back to message</button>
      )}
      <div className="image">
        {selectedFile ? (
          <div>
            <img
              src={preview}
              alt="preview"
              style={{ height: 400, width: 300, objectFit: "contain" }}
            />
          </div>
        ) : (
          <input
            data-testid="select-img"
            accept="image/*"
            type="file"
            onChange={handleFileInput}
          />
        )}
      </div>
      <button type="button" onClick={() => handleUpload(selectedFile)}>
        Upload and send
      </button>
    </>
  );
}
