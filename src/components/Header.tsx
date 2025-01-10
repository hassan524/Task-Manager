import React, { useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-[100vw] custom-md:h-[9vh] h-[7vh]">
            <div
                className="w-full h-full flex items-center justify-end px-2"
                style={{
                    background: "linear-gradient(to right, rgb(255,255,255) 50.62%, rgba(61,108,255,0.5) 100%)",
                }}
            >
                <Hamburger
                    toggled={isOpen}
                    toggle={setIsOpen}
                    color="#ffff"
                    size={20} />
            </div>
        </div>
    );
};

export default Header;

