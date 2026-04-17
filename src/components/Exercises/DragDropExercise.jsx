import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { DndContext, PointerSensor, useDraggable, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import ExerciseFeedback from './ExerciseFeedback';
import styles from './Exercises.module.css';

function DraggableChip({ id, label }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = transform
    ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
    : undefined;

  return (
    <button
      ref={setNodeRef}
      style={style}
      className={`${styles.chip} ${isDragging ? styles.dragging : ''}`}
      {...listeners}
      {...attributes}
    >
      {label}
    </button>
  );
}

DraggableChip.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

function DropSlot({ id, children, active }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${styles.slot} ${active || isOver ? styles.slotActive : ''}`}>
      {children || <span className={styles.slotHint}>Solte aqui</span>}
    </div>
  );
}

DropSlot.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
};

function DragDropExercise({ exercise, solved, onSolved }) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const baseItems = useMemo(
    () => exercise.sourceItems.map((item, index) => ({ id: `${exercise.id}-${index}`, label: item })),
    [exercise.id, exercise.sourceItems],
  );
  const [source, setSource] = useState(baseItems);
  const [slots, setSlots] = useState(Array(exercise.solution.length).fill(null));
  const [feedback, setFeedback] = useState(solved ? { status: 'success', message: exercise.successMessage } : null);

  const checkSolution = (nextSlots) => {
    if (nextSlots.every(Boolean)) {
      const isCorrect = nextSlots.map((item) => item.label).join('||') === exercise.solution.join('||');
      if (isCorrect) {
        setFeedback({ status: 'success', message: exercise.successMessage });
        onSolved();
      } else {
        setFeedback({ status: 'warning', message: 'Quase! Tente trocar a ordem das pecas.' });
      }
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;
    const dragged = [...source, ...slots.filter(Boolean)].find((item) => item.id === active.id);
    if (!dragged) return;

    let nextSource = source.filter((item) => item.id !== active.id);
    const nextSlots = slots.map((item) => (item?.id === active.id ? null : item));

    if (over.id === `${exercise.id}-source`) {
      nextSource = [...nextSource, dragged];
      setSource(nextSource);
      setSlots(nextSlots);
      return;
    }

    const slotIndex = Number(String(over.id).replace(`${exercise.id}-slot-`, ''));
    if (Number.isNaN(slotIndex)) return;

    const replaced = nextSlots[slotIndex];
    if (replaced) {
      nextSource = [...nextSource, replaced];
    }
    nextSlots[slotIndex] = dragged;
    setSource(nextSource);
    setSlots(nextSlots);
    checkSolution(nextSlots);
  };

  return (
    <div className={styles.exerciseBody}>
      <p className={styles.prompt}>{exercise.prompt}</p>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <DropSource id={`${exercise.id}-source`}>
          {source.map((item) => (
            <DraggableChip key={item.id} id={item.id} label={item.label} />
          ))}
        </DropSource>
        <div className={styles.slotRow}>
          {slots.map((item, index) => (
            <DropSlot
              key={`${exercise.id}-slot-${index}`}
              id={`${exercise.id}-slot-${index}`}
              active={Boolean(item)}
            >
              {item ? <DraggableChip id={item.id} label={item.label} /> : null}
            </DropSlot>
          ))}
        </div>
      </DndContext>
      <ExerciseFeedback status={feedback?.status || null} message={feedback?.message} />
    </div>
  );
}

function DropSource({ id, children }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <div ref={setNodeRef} className={`${styles.bank} ${isOver ? styles.slotActive : ''}`}>
      {children}
    </div>
  );
}

DropSource.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

DragDropExercise.propTypes = {
  exercise: PropTypes.object.isRequired,
  solved: PropTypes.bool.isRequired,
  onSolved: PropTypes.func.isRequired,
};

export default DragDropExercise;
