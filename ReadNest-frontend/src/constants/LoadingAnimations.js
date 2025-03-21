// Animation for individual letters in the loading screen
export const letterAnimation = {
  hidden: { y: 0 },
  visible: {
    y: [-20, 0],
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 5,
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

// Animation for the container in the loading screen
export const containerAnimation = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
