import PropTypes from 'prop-types';
import { Menu, Trophy } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import styles from './TopBar.module.css';

function TopBar({ route, currentChapterId, totalChapters, onMenu, onOpenHome, onOpenProgress }) {
  const { completedChapters } = useProgress();
  const pageTitle =
    route.page === 'home' ? 'Inicio' : route.page === 'progress' ? 'Progresso' : `Capitulo ${currentChapterId} de ${totalChapters}`;

  return (
    <header className={styles.topBar}>
      <button className={styles.iconButton} onClick={onMenu} aria-label="Abrir menu">
        <Menu size={22} />
      </button>
      <button className={styles.brandButton} onClick={onOpenHome}>
        Elisa aprende web 3.0
      </button>
      <div className={styles.centerText}>{pageTitle}</div>
      <button className={styles.progressButton} onClick={onOpenProgress}>
        <Trophy size={18} />
        {completedChapters} capitulos
      </button>
    </header>
  );
}

TopBar.propTypes = {
  route: PropTypes.shape({
    page: PropTypes.string.isRequired,
  }).isRequired,
  currentChapterId: PropTypes.number.isRequired,
  totalChapters: PropTypes.number.isRequired,
  onMenu: PropTypes.func.isRequired,
  onOpenHome: PropTypes.func.isRequired,
  onOpenProgress: PropTypes.func.isRequired,
};

export default TopBar;
