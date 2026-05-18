import { motion } from 'framer-motion';
import { Box } from '@mui/material';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

export default function AnimatedSection({
  children,
  delay = 0,
  sx = {},
  ...props
}) {
  return (
    <Box
      component={motion.section}
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      sx={sx}
      {...props}
    >
      {children}
    </Box>
  );
}
