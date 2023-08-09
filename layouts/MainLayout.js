import React from "react";

const MainLayout = ({ children }) => {
  return (
    <main>
      <div>this is layout</div>
      <div>{children}</div>
    </main>
  );
};

export default MainLayout;
