import React from 'react';
import { motion } from 'framer-motion';
import { deniedLocationAnimation } from '../../constants/textGradient';

const DeniedLocationPermission = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-yellow-500">
      <motion.h1
        className="text-6xl font-bold mb-4"
        variants={deniedLocationAnimation}
        initial="hidden"
        animate="animate"
      >
        Location Access Required
      </motion.h1>
      <motion.p
        className="text-2xl"
        variants={deniedLocationAnimation}
        initial="hidden"
        animate="animate"
      >
        Please allow location access to use this application.
      </motion.p>
    </div>
  );
};

export default DeniedLocationPermission;
