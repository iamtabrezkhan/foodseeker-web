import React, { useState } from "react";
import Classes from "./DragDropImage.module.css";
import Spinner from "../Spinner/Spinner";

const isValidImageType = (type) => {
  return type === "image/jpeg" || type === "image/jpg" || type === "image/png";
};

export default function DragDropImage({ onChange, isAnalyzing }) {
  const [imageSrc, setImageSrc] = useState("");
  const [isHighlight, setHighlight] = useState(false);
  const processFile = (image) => {
    if (!image) {
      return;
    }
    if (!isValidImageType(image.type)) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      const src = e.target.result;
      setImageSrc(src);
      onChange(image);
    };
    reader.readAsDataURL(image);
  };
  const onImageSelect = (e) => {
    if (isAnalyzing) {
      e.preventDefault();
      return;
    }
    const image = e.target.files[0];
    processFile(image);
  };
  const dragOver = (e) => {
    if (isAnalyzing) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    if (isAnalyzing) {
      return;
    }
    setHighlight(true);
  };
  const dragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAnalyzing) {
      return;
    }
    setHighlight(false);
  };
  const drop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAnalyzing) {
      return;
    }
    const file = e.dataTransfer.files[0];
    processFile(file);
    setHighlight(false);
  };
  return (
    <label
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={drop}
      className={Classes.main}
      htmlFor="image"
      style={{
        border: isHighlight ? "3px dashed #ff6464" : "3px dashed #c3c3c3",
        background: isHighlight ? "#ddd" : "",
      }}
    >
      {isAnalyzing && (
        <div className={Classes.spinnerContainer}>
          <Spinner />
        </div>
      )}
      {!imageSrc && (
        <div className={Classes.text}>
          Drop an image here or click to select one
        </div>
      )}
      {imageSrc && <img src={imageSrc} alt="Image" />}
      <input
        style={{ display: "none" }}
        type="file"
        name="image"
        id="image"
        onChange={onImageSelect}
      />
    </label>
  );
}
