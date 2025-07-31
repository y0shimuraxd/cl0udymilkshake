import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-accent/30 to-primary/20" />
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent/20 blur-xl"
        style={{ y: y1 }}
      />
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 rounded-full bg-primary/20 blur-xl"
        style={{ y: y2 }}
      />
      <motion.div
        className="absolute bottom-32 left-1/3 w-40 h-40 rounded-full bg-accent/15 blur-xl"
        style={{ y: y3 }}
      />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
    </div>
  );
};

export default ParallaxBackground;