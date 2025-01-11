import React from "react";
import { Turn as Hamburger } from "hamburger-react";

const Header = () => {

  return (
    <div className="w-[100vw] h-[3rem]">
      <div
        className="w-full h-full flex items-center justify-end px-2 shadow-sm"
        style={{
          background: "linear-gradient(to right, rgba(250, 250, 250, 1) 50.62%, rgba(61,108,255, 0.7) 100%)",
        }}
      >
      </div>
    </div>
  );
};

export default Header;
