import React from 'react';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
      <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg">
        <div className="flex flex-col p-6">
          <button className="self-end mb-8" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2L2 14M2 2l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <nav className="flex flex-col space-y-4">
            <a href="/" className="text-subtitle uppercase">Home</a>
            <a href="/headphones" className="text-subtitle uppercase">Headphones</a>
            <a href="/speakers" className="text-subtitle uppercase">Speakers</a>
            <a href="/earphones" className="text-subtitle uppercase">Earphones</a>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Menu;