import React from "react";
import "../Chip.css"; // or wherever your Chip styles are

export default function Chip({ label, image }) {
  return (
    <div className="chip">
      <img src={image} alt={`${label} avatar`} className="chip__image" />
      <span className="chip__label">{label}</span>
    </div>
  );
}
