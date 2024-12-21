import {
  createContext,
  Fragment,
  HTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import DraggableItem from "./DraggableItem";
import DropArea from "./DropArea";

export interface DraggableDataItem {
  id: string;
  displayName: string;
  [key: string]: any;
}

export interface DraggableAreaProps {
  dataSources: DraggableDataItem[];
  turnDataItemPosition: (itemIndex: number, newPosition: number) => any;
  htmlAttributes?: HTMLAttributes<HTMLDivElement>;
}
export const DraggableAreaContext = createContext<{
  isDragging: boolean;
}>({ isDragging: false });

function DraggableArea(props: DraggableAreaProps) {
  const { dataSources, htmlAttributes, turnDataItemPosition } = props;
  const [activeItem, setActiveItem] = useState<number | null>(null);
  useEffect(() => {
    if (activeItem) console.log(activeItem);
  }, [activeItem]);

  const handleDragStart = useCallback(
    (itemIndex: number) => {
      setActiveItem(itemIndex);
    },
    [setActiveItem]
  );

  const handleDragEnd = useCallback(
    (itemIndex: number) => {
      setActiveItem((prev) => (prev === itemIndex ? null : prev));
    },
    [setActiveItem]
  );

  const handleDrop = useCallback(
    (itemIndex: number) => {
      if (typeof activeItem === "number") {
        // console.log(`Turn from ${activeItem} to ${itemIndex}`);
        turnDataItemPosition(activeItem, itemIndex);
        setActiveItem(null);
      }
    },
    [activeItem, setActiveItem, turnDataItemPosition]
  );

  return (
    <>
      <div {...htmlAttributes}>
        <DraggableAreaContext.Provider
          value={{ isDragging: activeItem !== null }}
        >
          {dataSources.map((item, index) => (
            <Fragment key={item.id}>
              <DropArea
                content={
                  <div className="card custom-drop-area-content">
                    <div className="card-body">DROP HERE</div>
                  </div>
                }
                itemIndex={Math.max(index - 1, 0)}
                onDrop={() => handleDrop(Math.max(index - 1, 0))}
              />
              <DraggableItem
                itemIndex={index}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                htmlAttributes={{
                  className: "card my-1",
                }}
              >
                <div
                  className="card-body"
                  style={{ background: item.background }}
                >
                  {item.displayName}
                </div>
              </DraggableItem>
            </Fragment>
          ))}
        </DraggableAreaContext.Provider>
      </div>
    </>
  );
}
export default DraggableArea;
