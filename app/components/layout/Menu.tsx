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
          <Category isMenu={true} />
        </div>
      </div>
    </div>
  );
};

export default Menu;