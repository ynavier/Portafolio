import { motion } from 'framer-motion';

interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
}

const SectionDivider = ({
  fromColor = 'from-transparent',
  toColor = 'to-transparent'
}: SectionDividerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className={`h-32 bg-gradient-to-b ${fromColor} ${toColor} pointer-events-none`}
    />
  );
};

export default SectionDivider;
