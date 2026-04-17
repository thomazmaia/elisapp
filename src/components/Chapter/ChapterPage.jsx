import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import ConceptCard from './ConceptCard';
import DragDropExercise from '../Exercises/DragDropExercise';
import MatchExercise from '../Exercises/MatchExercise';
import FillExercise from '../Exercises/FillExercise';
import VisualIdentifyExercise from '../Exercises/VisualIdentifyExercise';
import styles from './ChapterPage.module.css';

const exerciseMap = {
  'drag-drop-build': DragDropExercise,
  'drag-drop-match': MatchExercise,
  'fill-blank': FillExercise,
  'visual-identify': VisualIdentifyExercise,
};

function ChapterPage({ chapter, nextChapter, onBackHome, onOpenChapter }) {
  const { isExerciseComplete, markExerciseComplete } = useProgress();
  const initialIndex = useMemo(() => {
    const firstPending = chapter.exercises.findIndex((exercise) => !isExerciseComplete(exercise.id));
    return firstPending >= 0 ? firstPending : 0;
  }, [chapter.exercises, isExerciseComplete]);
  const [exerciseIndex, setExerciseIndex] = useState(initialIndex);
  const activeExercise = chapter.exercises[exerciseIndex];
  const activeSolved = isExerciseComplete(activeExercise.id);

  useEffect(() => {
    setExerciseIndex(initialIndex);
  }, [initialIndex, chapter.id]);

  const handleSolved = () => {
    markExerciseComplete(activeExercise.id);
  };

  const handleNextExercise = () => {
    if (exerciseIndex < chapter.exercises.length - 1) {
      setExerciseIndex((current) => current + 1);
    }
  };

  const ExerciseComponent = exerciseMap[activeExercise.type];

  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ '--accent': chapter.color }}>
        <button className={styles.backButton} onClick={onBackHome}>
          <ArrowLeft size={18} />
          Inicio
        </button>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.chapterKicker}>
              Capitulo {chapter.id} de 13
            </p>
            <h1>
              {chapter.emoji} {chapter.title}
            </h1>
            <h2>{chapter.forElisa.headline}</h2>
            <p>{chapter.forElisa.description}</p>
          </div>
          <div className={styles.metaphorCard}>
            <span className={styles.bigEmoji}>{chapter.emoji}</span>
            <strong>{chapter.forElisa.metaphorAlt}</strong>
          </div>
        </div>
      </section>

      <section className={styles.interpreterBox}>
        <strong>👤 Para o interprete</strong>
        <p>{chapter.forInterpreter}</p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Aprender</h2>
          <p>Uma ideia por vez, com exemplo visual.</p>
        </div>
        <div className={styles.conceptList}>
          {chapter.concepts.map((concept) => (
            <ConceptCard key={`${chapter.id}-${concept.name}`} concept={concept} />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Exercicios</h2>
          <p>
            Exercicio {exerciseIndex + 1} de {chapter.exercises.length}
          </p>
        </div>

        <div className={styles.exerciseCard}>
          <div className={styles.exerciseTop}>
            <div>
              <strong>{activeExercise.instruction}</strong>
              <p>Toque, arraste e veja a resposta na hora.</p>
            </div>
            {activeSolved ? (
              <span className={styles.doneChip}>
                <CheckCircle2 size={18} />
                Concluido
              </span>
            ) : null}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeExercise.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <ExerciseComponent exercise={activeExercise} solved={activeSolved} onSolved={handleSolved} />
            </motion.div>
          </AnimatePresence>

          <div className={styles.exerciseFooter}>
            <div className={styles.exerciseDots}>
              {chapter.exercises.map((exercise, index) => (
                <button
                  key={exercise.id}
                  className={`${styles.dot} ${index === exerciseIndex ? styles.dotActive : ''} ${
                    isExerciseComplete(exercise.id) ? styles.dotDone : ''
                  }`}
                  onClick={() => setExerciseIndex(index)}
                  aria-label={`Ir para exercicio ${index + 1}`}
                />
              ))}
            </div>

            {activeSolved && exerciseIndex < chapter.exercises.length - 1 ? (
              <button className={styles.nextButton} onClick={handleNextExercise}>
                Proximo
                <ArrowRight size={18} />
              </button>
            ) : null}

            {chapter.exercises.every((exercise) => isExerciseComplete(exercise.id)) ? (
              <button
                className={styles.nextButton}
                onClick={() => onOpenChapter(nextChapter ? nextChapter.slug : chapter.slug)}
              >
                {nextChapter ? 'Ir para o proximo capitulo' : 'Capitulo completo'}
                <ArrowRight size={18} />
              </button>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

ChapterPage.propTypes = {
  chapter: PropTypes.object.isRequired,
  nextChapter: PropTypes.object,
  onBackHome: PropTypes.func.isRequired,
  onOpenChapter: PropTypes.func.isRequired,
};

export default ChapterPage;
