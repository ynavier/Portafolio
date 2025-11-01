import React from "react";

const HeroImage = () => {
  return (
    <div className="mb-8">
      <div className="w-32 h-32 mx-auto rounded-full shadow-xl">
        <img
          src="/prins.png"
          alt="Yoriel Carvajalino"
          className="w-32 h-32 rounded-full object-cover"
        />
      </div>
    </div>
  );
};

export default HeroImage;
