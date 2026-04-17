import PropTypes from 'prop-types';
import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import styles from './AppShell.module.css';

function AppShell({ route, chapters, currentChapterId, onNavigate, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <Sidebar
        isOpen={sidebarOpen}
        chapters={chapters}
        currentChapterId={currentChapterId}
        route={route}
        onNavigate={onNavigate}
        onClose={() => setSidebarOpen(false)}
      />
      <div className={styles.content}>
        <TopBar
          route={route}
          currentChapterId={currentChapterId}
          totalChapters={chapters.length}
          onMenu={() => setSidebarOpen((current) => !current)}
          onOpenHome={() => onNavigate({ page: 'home' })}
          onOpenProgress={() => onNavigate({ page: 'progress' })}
        />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}

AppShell.propTypes = {
  route: PropTypes.shape({
    page: PropTypes.string.isRequired,
    slug: PropTypes.string,
  }).isRequired,
  chapters: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentChapterId: PropTypes.number.isRequired,
  onNavigate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default AppShell;
