import React, { useState } from "react";
import Classes from "./Home.module.css";
import DragDropImage from "../DragDropImage/DragDropImage";

const URL = "http://192.168.43.159:5000/test";

export default function Home() {
  const [image, setImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const onImageChange = (image) => {
    setResult(null);
    setImage((prevState) => {
      return image;
    });
  };
  const analyze = () => {
    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("testImage", image, image.name);
    setResult(null);
    setIsAnalyzing(true);
    fetch(URL, {
      body: formData,
      method: "POST",
    })
      .then((res) => {
        res.json().then((result) => {
          setResult((prevState) => {
            return result;
          });
          setIsAnalyzing(false);
          const history = JSON.parse(localStorage.getItem("history")) || [];
          const newHistory = [result, ...history];
          localStorage.setItem("history", JSON.stringify(newHistory));
        });
      })
      .catch((err) => {
        setResult(null);
        setIsAnalyzing(false);
      });
  };
  return (
    <div className={Classes.main}>
      <div className="img-container">
        {result && (
          <div className="result">
            Result: {result.label}, Confidence: {result.accuracy}
          </div>
        )}
        <DragDropImage onChange={onImageChange} isAnalyzing={isAnalyzing} />
        <div className="actions">
          <button onClick={analyze} name="analyze" disabled={isAnalyzing}>
            {isAnalyzing ? "Analyzing..." : "Analyze"}
          </button>
          {result && (
            <a
              href={`https://google.com/search?q=${result.label} recipes`}
              name="analyze"
              target="_blank"
            >
              Search Recipes
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
