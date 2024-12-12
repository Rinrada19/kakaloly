import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Camera } from "react-bootstrap-icons";

export const UploadImage = () => {
  const [source, setSource] = useState("");

  const handleCapture = (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const newUrl = URL.createObjectURL(file);
        setSource(newUrl);
      }
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <div className="w-100">
        <h5>Capture your image</h5>
        {source && (
          <div
            className="border mt-2"
            style={{ maxWidth: "80%", maxHeight: "80%", margin: "10px" }}
          >
            <img
              src={source}
              alt="snap"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        )}
        <input
          accept="image/*"
          id="icon-button-file"
          type="file"
          capture="environment"
          onChange={(e) => handleCapture(e.target)}
          style={{ display: "none" }}
        />
        <label htmlFor="icon-button-file">
          <Button variant="primary" as="span">
            <Camera size={24} /> Upload picture
          </Button>
        </label>
      </div>
    </div>
  );
};
