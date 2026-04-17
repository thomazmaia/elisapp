import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ExerciseFeedback.module.css';

function ExerciseFeedback({ status, message }) {
  return (
    <AnimatePresence mode="wait">
      {status ? (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8 }}
          className={`${styles.box} ${status === 'success' ? styles.success : styles.warning}`}
        >
          <span className={styles.emoji}>{status === 'success' ? '🌟' : '🙂'}</span>
          <span>{message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

ExerciseFeedback.propTypes = {
  status: PropTypes.oneOf([null, 'success', 'warning']),
  message: PropTypes.string,
};

export default ExerciseFeedback;
