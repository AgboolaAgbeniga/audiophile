import React, { useEffect } from 'react';
import Category from './Category';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-20 left-0 right-0 bottom-0 bg-black/50 z-50 lg:hidden h-auto ">
      <div className="absolute top-0 left-0 w-full h-auto max-h-screen bg-white shadow-lg overflow-y-auto rounded-b-lg pb-20 md:pb-8 ">
        <div className="flex flex-col p-6">
          <button className="self-end mb-2" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2L2 14M2 2l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <Category isMenu={true} />
        </div>
      </div>
    </div>
  );
};

export default Menu;