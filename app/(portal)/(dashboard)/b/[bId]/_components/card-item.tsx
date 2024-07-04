"use client";

import { Draggable } from "@hello-pangea/dnd";

import { useCardModal } from "@/hooks/use-card-modal";
import { CardWithLabels } from "@/types/list-card";

interface CardItemProps {
  data: CardWithLabels;
  index: number;
}

const CardItem = ({ data, index }: CardItemProps) => {
  const cardModal = useCardModal();
  const labels = data.cardLabels.map((item) => item.label);

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => cardModal.onOpen(data.id)}
          role="button"
          className="truncate border-2 border-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm ">
          {labels && labels.length > 0 && (
            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-2">
              {labels.map((label) => (
                <div
                  key={label.id}
                  className="w-full h-4 rounded-sm"
                  style={{ backgroundColor: label.color }}></div>
              ))}
            </div>
          )}
          {data.title}
        </div>
      )}
    </Draggable>
  );
};

export default CardItem;
