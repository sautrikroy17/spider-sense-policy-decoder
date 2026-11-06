import React from 'react';
import { motion } from 'framer-motion';

export const BlurFade = ({
  children,
  className = '',
  delay = 0,
  duration = 0.5,
  yOffset = 8,
  blur = '10px'
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: `blur(${blur})`,
        y: yOffset
      }}
      animate={{
        opacity: 1,
        filter: 'blur(0px)',
        y: 0
      }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
