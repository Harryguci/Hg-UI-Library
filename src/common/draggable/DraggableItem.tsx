import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from "react";
import "./draggableItem.css";
export interface DraggableItemProps {
  itemIndex: number;
  onDragStart: (itemIndex: number) => any;
  onDragEnd: (itemIndex: number) => any;
  htmlAttributes?: HTMLAttributes<HTMLDivElement>;
}

function DraggableItem(props: PropsWithChildren<DraggableItemProps>) {
  const { children, itemIndex, htmlAttributes, onDragStart, onDragEnd } = props;
  const draggableItemRef = useRef<HTMLDivElement>(null);
  const dragPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleDragStart(event: any) {
      draggableItemRef.current?.classList.add("dragging");
      if (dragPreviewRef.current)
        event.dataTransfer?.setDragImage(dragPreviewRef.current, 300, 200);
    }
    function handleDragEnd(_: any) {
      draggableItemRef.current?.classList.remove("dragging");
    }

    draggableItemRef.current?.addEventListener("dragstart", handleDragStart);
    draggableItemRef.current?.addEventListener("dragend", handleDragEnd);

    return () => {
      draggableItemRef.current?.removeEventListener(
        "dragstart",
        handleDragStart
      );
      draggableItemRef.current?.removeEventListener("dragend", handleDragEnd);
    };
  }, [draggableItemRef, dragPreviewRef]);
  return (
    <>
      <div
        {...htmlAttributes}
        ref={draggableItemRef}
        draggable
        className={"draggable-item " + (htmlAttributes?.className ?? "")}
        style={{
          cursor: "grab",
          ...htmlAttributes?.style,
        }}
        onDragStart={() => onDragStart(itemIndex)}
        onDragEnd={() => onDragEnd(itemIndex)}
      >
        {children}
      </div>
      <div
        ref={dragPreviewRef}
        style={{
          position: "absolute",
          top: "-9999px",
          width: "500px",
          height: "80px",
          backgroundColor: "gray",
          color: "white",
          display: "block",
          borderRadius: "10px",
          padding: "1rem",
          fontSize: "16px",
          opacity: 1,
          transform: "scale(0.005)", // Adjust the scale as necessary
        }}
      >
        {children}
      </div>
    </>
  );
}

export default DraggableItem;
