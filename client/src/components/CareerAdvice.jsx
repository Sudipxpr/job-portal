import React from "react";
import CareerAdviceChat from "./CareerAdviceChat";
import Navbar from "./shared/Navbar";

const CareerAdvice = () => {
  return (
    <div>
      <Navbar/>
      <div className="pt-7">
      <CareerAdviceChat />
      </div>
    </div>
  );
};

export default CareerAdvice;