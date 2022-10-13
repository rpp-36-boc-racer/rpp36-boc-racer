import React, { useState } from "react";
import { uploadFile } from "react-s3";
import useAuthContext from "../hooks/useAuthContext";

const config = {
  bucketName: process.env.S3_BUCKET,
  region: process.env.REGION,
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

export default function UploadImage() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (file) => {
    uploadFile(file, config)
      .then((data) => console.log(data.location))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div>React S3 File Upload</div>
      <input type="file" onChange={handleFileInput} />
      <button type="button" onClick={() => handleUpload(selectedFile)}>
        Upload to S3
      </button>
    </>
  );
}
