import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ParallaxBackground from '../UI/ParallaxBackground';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <ParallaxBackground />
    <Header />
    <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {children}
    </main>
  </div>
);

export default MainLayout;