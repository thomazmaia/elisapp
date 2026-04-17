import { useEffect, useState } from 'react';
import chapters from './data/chapters';
import { useProgress } from './context/ProgressContext';
import AppShell from './components/Layout/AppShell';
import ChapterPage from './components/Chapter/ChapterPage';
import ProgressBadge from './components/UI/ProgressBadge';
import appStyles from './App.module.css';

const getRouteFromHash = () => {
  const hash = window.location.hash.replace(/^#/, '');
  if (!hash || hash === '/') return { page: 'home' };
  if (hash === '/progress') return { page: 'progress' };
  if (hash.startsWith('/chapter/')) {
    return { page: 'chapter', slug: hash.replace('/chapter/', '') };
  }
  return { page: 'home' };
};

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const {
    setCurrentChapter,
    chapterStatus,
    completedChapters,
    totalChapters,
    progressPercent,
    lastVisitedChapterId,
    resetProgress,
  } = useProgress();

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = (nextRoute) => {
    if (nextRoute.page === 'home') window.location.hash = '/';
    if (nextRoute.page === 'progress') window.location.hash = '/progress';
    if (nextRoute.page === 'chapter') window.location.hash = `/chapter/${nextRoute.slug}`;
  };

  const currentChapter =
    route.page === 'chapter'
      ? chapters.find((chapter) => chapter.slug === route.slug) || chapters[0]
      : chapters.find((chapter) => chapter.id === lastVisitedChapterId) || chapters[0];

  useEffect(() => {
    if (route.page === 'chapter' && currentChapter) {
      setCurrentChapter(currentChapter.id);
    }
  }, [currentChapter, route.page, setCurrentChapter]);

  return (
    <AppShell
      route={route}
      chapters={chapters}
      currentChapterId={currentChapter.id}
      onNavigate={navigate}
    >
      {route.page === 'progress' ? (
        <ProgressScreen
          chapters={chapters}
          chapterStatus={chapterStatus}
          completedChapters={completedChapters}
          totalChapters={totalChapters}
          progressPercent={progressPercent}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
        />
      ) : route.page === 'chapter' ? (
        <ChapterPage
          chapter={currentChapter}
          nextChapter={chapters.find((chapter) => chapter.id === currentChapter.id + 1) || null}
          onBackHome={() => navigate({ page: 'home' })}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
        />
      ) : (
        <HomeScreen
          chapters={chapters}
          chapterStatus={chapterStatus}
          progressPercent={progressPercent}
          completedChapters={completedChapters}
          totalChapters={totalChapters}
          continueChapter={currentChapter}
          onContinue={() => navigate({ page: 'chapter', slug: currentChapter.slug })}
          onOpenChapter={(slug) => navigate({ page: 'chapter', slug })}
          onOpenProgress={() => navigate({ page: 'progress' })}
          onResetProgress={() => {
            resetProgress();
            navigate({ page: 'home' });
          }}
        />
      )}
    </AppShell>
  );
}

function HomeScreen({
  chapters,
  chapterStatus,
  progressPercent,
  completedChapters,
  totalChapters,
  continueChapter,
  onContinue,
  onOpenChapter,
  onOpenProgress,
  onResetProgress,
}) {
  const handleReset = () => {
    const confirmed = window.confirm('Apagar todo o progresso e voltar ao comeco?');
    if (confirmed) {
      onResetProgress();
    }
  };

  return (
    <div className={appStyles.stack}>
      <section className={appStyles.hero}>
        <div className={appStyles.heroText}>
          <p className={appStyles.kicker}>Aprender com calma, cor e movimento</p>
          <h1>Elisa aprende web 3.0</h1>
          <p className={appStyles.welcome}>Ola, Elisa! Vamos aprender HTML juntos? 🚀</p>
          <div className={appStyles.heroActions}>
            <button className={appStyles.primaryButton} onClick={onContinue}>
              Continuar de onde parei
            </button>
            <button className={appStyles.secondaryButton} onClick={onOpenProgress}>
              Ver meu progresso
            </button>
            <button className={appStyles.resetButton} onClick={handleReset}>
              Reiniciar progresso
            </button>
          </div>
          <p className={appStyles.continueHint}>
            Proximo ponto: capitulo {continueChapter.id} - {continueChapter.title}
          </p>
          <p className={appStyles.resetHint}>Isso apaga todos os capitulos e exercicios salvos neste iPad.</p>
        </div>
        <div className={appStyles.heroCard}>
          <div className={appStyles.orbit}>🌐</div>
          <div className={appStyles.device}>📱</div>
          <div className={appStyles.device}>💻</div>
          <div className={appStyles.device}>🖥️</div>
        </div>
      </section>

      <section className={appStyles.progressSection}>
        <div>
          <h2>Seu caminho</h2>
          <p>
            {completedChapters} de {totalChapters} capitulos concluidos
          </p>
        </div>
        <ProgressBadge completed={completedChapters} total={totalChapters} percent={progressPercent} />
      </section>

      <section className={appStyles.chapterGrid}>
        {chapters.map((chapter) => {
          const status = chapterStatus.find((item) => item.chapterId === chapter.id);
          return (
            <button
              key={chapter.id}
              className={appStyles.chapterCard}
              onClick={() => onOpenChapter(chapter.slug)}
            >
              <div className={appStyles.chapterCardTop}>
                <span className={appStyles.chapterEmoji}>{chapter.emoji}</span>
                <span className={appStyles.chapterStatus}>
                  {status?.isCompleted ? '✅ Concluido' : status?.completedCount ? '🟡 Em progresso' : '⚪ Nao iniciado'}
                </span>
              </div>
              <strong>
                Capitulo {chapter.id}
              </strong>
              <span>{chapter.title}</span>
            </button>
          );
        })}
      </section>
    </div>
  );
}

function ProgressScreen({ chapters, chapterStatus, completedChapters, totalChapters, progressPercent, onOpenChapter }) {
  return (
    <div className={appStyles.stack}>
      <section className={appStyles.progressHero}>
        <div>
          <p className={appStyles.kicker}>Visao geral</p>
          <h1>Seu progresso</h1>
          <p>
            {completedChapters} de {totalChapters} capitulos concluidos - {progressPercent}%
          </p>
        </div>
        <ProgressBadge completed={completedChapters} total={totalChapters} percent={progressPercent} large />
      </section>

      <div className={appStyles.progressBarWrap}>
        <div className={appStyles.progressBarFill} style={{ width: `${progressPercent}%` }} />
      </div>

      <section className={appStyles.chapterGrid}>
        {chapters.map((chapter) => {
          const status = chapterStatus.find((item) => item.chapterId === chapter.id);
          return (
            <button
              key={chapter.id}
              className={appStyles.chapterCard}
              onClick={() => onOpenChapter(chapter.slug)}
            >
              <div className={appStyles.chapterCardTop}>
                <span className={appStyles.chapterEmoji}>{chapter.emoji}</span>
                <span className={appStyles.chapterStatus}>
                  {status?.isCompleted ? '✅ Concluido' : status?.completedCount ? '🟡 Em progresso' : '⚪ Nao iniciado'}
                </span>
              </div>
              <strong>
                Capitulo {chapter.id}
              </strong>
              <span>{chapter.title}</span>
              <small>
                {status?.completedCount || 0} / {status?.totalCount || 0} exercicios
              </small>
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default App;
