import React from "react";

const Card = ({ title, lastedited }) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-muted-foreground">{lastedited}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
