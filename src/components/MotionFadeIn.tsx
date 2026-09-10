import React from 'react';
import { motion } from 'motion/react';

interface MotionFadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

export const MotionFadeIn: React.FC<MotionFadeInProps> = ({
  children,
  delay = 0,
  duration = 0.55,
  yOffset = 20,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0], // smooth cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
