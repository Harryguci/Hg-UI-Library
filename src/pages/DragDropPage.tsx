import { useCallback, useMemo, useState } from "react";
import DraggableArea, {
  DraggableDataItem,
} from "../common/draggable/DraggableArea";

const backgroundColors = [
  "#FFB3BA", // Pastel pink
  "#FFDFBA", // Pastel peach
  "#FFFFBA", // Pastel yellow
  "#BAFFC9", // Pastel green
  "#BAE1FF", // Pastel blue
  "#D4A5A5", // Soft rose
  "#F1E1A6", // Light gold
  "#C9CCD5", // Soft gray
  "#FFCBC1", // Light coral
  "#D9F7BE", // Mint green
  "#A7C7E7", // Light sky blue
  "#FFD6E8", // Pale magenta
  "#FCE1CE", // Light apricot
  "#A4CABC", // Pale teal
  "#D3B8E6", // Lavender
  "#F5E6CC", // Beige
  "#C3E0DC", // Soft cyan
  "#E6E6FA", // Lavender blush
  "#F4CCCC", // Soft salmon
  "#C9DFF0", // Light periwinkle
];

function randomSelect(length: number) {
  let value = Math.random() * 100;
  value = value % length;
  return Math.floor(value);
}

function DragDropPage() {
  const defaultData = useMemo(
    () =>
      Array.from({ length: 100 }, (_, i) => i + 1).map((value) => ({
        id: `data000${value}`,
        displayName: `item${value}`,
        background: backgroundColors[randomSelect(backgroundColors.length)],
      })) as DraggableDataItem[],
    []
  );

  const [dataSource, setDataSource] =
    useState<DraggableDataItem[]>(defaultData);

  const handleTurnDataItemPosition = useCallback(
    function handleTurnDataItemPosition(
      itemIndex: number,
      newPosition: number
    ) {
      setDataSource((prev) => {
        let temp = { ...prev[itemIndex] };
        prev = prev.filter((p) => p.id !== temp.id);
        prev.splice(newPosition, 0, temp);
        return [...prev];
      });
    },
    [setDataSource]
  );

  return (
    <div className="container-fluid" style={{ height: "100vh" }}>
      <h1 className="display-3">DragDrop Test</h1>
      <DraggableArea
        htmlAttributes={{
          style: {
            border: "1px solid #eeeeee",
            borderRadius: "10px",
            maxHeight: "80vh",
            overflowY: "auto",
          },
        }}
        dataSources={dataSource}
        turnDataItemPosition={handleTurnDataItemPosition}
      />
    </div>
  );
}

export default DragDropPage;
