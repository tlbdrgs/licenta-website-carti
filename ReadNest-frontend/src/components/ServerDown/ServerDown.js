import React from 'react';
import { motion } from 'framer-motion';
import { waveVariants } from '../../constants/waveAnimation';

const ServerDown = () => {
  const text = "Sorry! Our servers are offline right now. Try again later.";

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <motion.h1 className="text-4xl font-bold text-center">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            variants={waveVariants}
            initial="initial"
            animate="animate"
            style={{ display: "inline-block" }}
            transition={{ delay: index * 0.1 }}
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

export default ServerDown;
