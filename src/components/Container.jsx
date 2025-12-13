import React from "react";

const Container = ({ children }) => {
  return (
    <div className="container mx-auto px-2.5 md:px-5 lg:px-0"> {children} </div>
  );
};

export default Container;
