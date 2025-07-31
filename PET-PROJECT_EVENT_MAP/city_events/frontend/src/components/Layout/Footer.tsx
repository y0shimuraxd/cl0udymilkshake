import React from 'react';

const Footer: React.FC = () => (
  <footer className="glass text-center py-4 mt-8 text-sm text-dark/60">
    © {new Date().getFullYear()} CityEvents. Все права защищены.
  </footer>
);

export default Footer;