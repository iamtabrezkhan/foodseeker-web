import React from "react";
import Classes from "./History.module.css";

export default function History() {
  const history = JSON.parse(localStorage.getItem("history")) || [];
  return (
    <div className={Classes.main}>
      <h3>Analyzing History:</h3>
      <div className={Classes.historyContainer}>
        {history.map((item, i) => {
          return (
            <div
              className={Classes.history}
              key={i}
              style={{
                background: i % 2 === 0 ? "#F7F7F7" : "#F2F2F2",
              }}
            >
              <div className={Classes.col}>{item.label}</div>
              <div className={Classes.col}>{item.accuracy}</div>
              <div className={Classes.btn}>
                <a
                  href={`https://google.com/search?q=${item.label} recipes`}
                  target="_blank"
                >
                  Search Recipes
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
