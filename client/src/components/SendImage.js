import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { uploadFile } from "react-s3";
import useAuthContext from "../hooks/useAuthContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function SendImage() {
  const { user } = useAuthContext();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    setIsLoading(true);

    uploadFile(file, config)
      .then(async (data) => {
        const response = await fetch("send-img", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${user.token}`,
          },
          body: JSON.stringify({ user, imageURL: data.location }),
        });

        const json = await response.json();
        if (response.ok) {
          // update some state?
        } else {
          setError(json.error);
        }

        setIsLoading(false);
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
        <Link to="/dashboard">
          <button type="button">Go back to message</button>
        </Link>
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
        {error && <p>Error: {error}</p>}
        {isLoading && <p>loading...</p>}
      </div>
      <button
        type="button"
        disabled={!selectedFile}
        onClick={() => handleUpload(selectedFile)}
      >
        Upload and send
      </button>
    </>
  );
}
