import PropTypes from 'prop-types';
import { BookOpen, Home, LayoutGrid, X } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import styles from './Sidebar.module.css';

function Sidebar({ isOpen, chapters, currentChapterId, route, onNavigate, onClose }) {
  const { chapterStatus } = useProgress();

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div>
          <p className={styles.brandSmall}>Elisa aprende</p>
          <h2>web 3.0</h2>
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="Fechar menu">
          <X size={22} />
        </button>
      </div>

      <div className={styles.quickActions}>
        <button
          className={`${styles.quickButton} ${route.page === 'home' ? styles.activeQuick : ''}`}
          onClick={() => {
            onNavigate({ page: 'home' });
            onClose();
          }}
        >
          <Home size={18} />
          Inicio
        </button>
        <button
          className={`${styles.quickButton} ${route.page === 'progress' ? styles.activeQuick : ''}`}
          onClick={() => {
            onNavigate({ page: 'progress' });
            onClose();
          }}
        >
          <LayoutGrid size={18} />
          Progresso
        </button>
      </div>

      <div className={styles.chapterList}>
        {chapters.map((chapter) => {
          const status = chapterStatus.find((item) => item.chapterId === chapter.id);
          return (
            <button
              key={chapter.id}
              className={`${styles.chapterButton} ${currentChapterId === chapter.id ? styles.activeChapter : ''}`}
              onClick={() => {
                onNavigate({ page: 'chapter', slug: chapter.slug });
                onClose();
              }}
            >
              <span className={styles.chapterIcon}>
                {status?.isCompleted ? '✅' : chapter.emoji}
              </span>
              <span>
                <strong>Cap. {chapter.id}</strong>
                <small>{chapter.title}</small>
              </span>
              <BookOpen size={18} />
            </button>
          );
        })}
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentChapterId: PropTypes.number.isRequired,
  route: PropTypes.shape({
    page: PropTypes.string.isRequired,
  }).isRequired,
  onNavigate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
