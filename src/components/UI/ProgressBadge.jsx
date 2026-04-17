import PropTypes from 'prop-types';
import styles from './ProgressBadge.module.css';

function ProgressBadge({ completed, total, percent, large = false }) {
  return (
    <div className={`${styles.badge} ${large ? styles.large : ''}`}>
      <strong>{percent}%</strong>
      <span>
        {completed}/{total} capitulos
      </span>
    </div>
  );
}

ProgressBadge.propTypes = {
  completed: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  percent: PropTypes.number.isRequired,
  large: PropTypes.bool,
};

export default ProgressBadge;
