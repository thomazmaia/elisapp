import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ExerciseFeedback from './ExerciseFeedback';
import styles from './Exercises.module.css';

function MatchItem({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button ref={setNodeRef} style={style} className={`${styles.chip} ${isDragging ? styles.dragging : ''}`} {...listeners} {...attributes}>
      {label}
    </button>
  );
}

MatchItem.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function MatchTarget({ id, preview, item }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${styles.matchTarget} ${isOver ? styles.slotActive : ''}`}>
      <span>{preview}</span>
      <div>{item ? <MatchItem id={item.id} label={item.label} /> : <span className={styles.slotHint}>Arraste a tag</span>}</div>
    </div>
  );
}

MatchTarget.propTypes = {
  id: PropTypes.string.isRequired,
  preview: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};

function MatchExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const pairItems = useMemo(
    () => exercise.pairs.map((pair) => ({ id: `${exercise.id}-${pair.id}`, label: pair.label, pairId: pair.id })),
    [exercise.id, exercise.pairs],
  );
  const [source, setSource] = useState(pairItems);
  const [matches, setMatches] = useState({});
  const [feedback, setFeedback] = useState(solved ? { status: 'success', message: exercise.successMessage } : null);

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const dragged = [...source, ...Object.values(matches).filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    const nextSource = source.filter((item) => item.id !== active.id);
    const nextMatches = Object.fromEntries(
      Object.entries(matches).map(([key, value]) => [key, value?.id === active.id ? null : value]),
    );

    if (String(over.id).endsWith('-source')) {
      setSource([...nextSource, dragged]);
      setMatches(nextMatches);
      return;
    }

    const targetId = String(over.id).replace(`${exercise.id}-target-`, '');
    const replaced = nextMatches[targetId];
    if (replaced) {
      nextSource.push(replaced);
    }
    nextMatches[targetId] = dragged;
    setSource(nextSource);
    setMatches(nextMatches);

    const allFilled = exercise.pairs.every((pair) => nextMatches[pair.id]);
    if (allFilled) {
      const isCorrect = exercise.pairs.every((pair) => nextMatches[pair.id]?.pairId === pair.id);
      if (isCorrect) {
        setFeedback({ status: 'success', message: exercise.successMessage });
        onSolved();
      } else {
        setFeedback({ status: 'warning', message: 'Quase! Veja qual preview combina melhor com cada tag.' });
      }
    }
  };

  return (
    <div className={styles.exerciseBody}>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={styles.matchGrid}>
          <DropBank id={`${exercise.id}-source`}>
            {source.map((item) => (
              <MatchItem key={item.id} id={item.id} label={item.label} />
            ))}
          </DropBank>
          <div className={styles.matchColumn}>
            {exercise.pairs.map((pair) => (
              <MatchTarget
                key={pair.id}
                id={`${exercise.id}-target-${pair.id}`}
                preview={pair.preview}
                item={matches[pair.id]}
              />
            ))}
          </div>
        </div>
      </DndContext>
      <ExerciseFeedback status={feedback?.status || null} message={feedback?.message} />
    </div>
  );
}

function DropBank({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${styles.bank} ${isOver ? styles.slotActive : ''}`}>
      {children}
    </div>
  );
}

DropBank.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

MatchExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default MatchExercise;
