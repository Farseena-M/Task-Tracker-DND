import { useDroppable } from '@dnd-kit/core';
import { ItemList } from './ItemList';

const Droppable = ({ completedItems}:any) => {
  const { setNodeRef } = useDroppable({ id: 'completed-tasks' });

  return (
    <div ref={setNodeRef} className="h-full">
      <ItemList items={completedItems} handleEdit={() => {}} handleDelete={() => {}} />
    </div>
  );
};

export default Droppable;
