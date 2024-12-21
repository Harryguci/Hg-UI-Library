import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, ReactNode, useMemo } from "react";
import { CoreTreeGridColumn } from "./CoreTreeGrid";
import React from "react";

type RowRendererProps = {
  row: any;
  columns: CoreTreeGridColumn[];
  setParentActive: (callback: (prev: any[]) => any[]) => void;
  keyMap: string;
  columnWidth: number[];
};

const RowRenderer: React.FC<RowRendererProps> = ({
  row,
  columns,
  setParentActive,
  keyMap,
  columnWidth,
}) => {
  const showSub = row.isRowActive;
  const hasSubItems = useMemo(() => row.subItems?.length > 0, [row.subItems]);
  const toggleSubItems = () => {
    setParentActive((prev: any[]) => {
      if (prev.includes(row[keyMap])) {
        return prev.filter((p) => p !== row[keyMap]);
      }
      return [...prev, row[keyMap]];
    });
  };

  const getPaddingLeft = (isFirstCell: boolean) =>
    isFirstCell && row.deepItem > 0
      ? `${Number.parseInt(row.deepItem) * 2 + 2}rem`
      : isFirstCell
      ? "2rem"
      : "0";

  const renderExpandIcon = (isFirstCell: boolean) =>
    isFirstCell &&
    hasSubItems && (
      <span className="me-2">
        {showSub && <FontAwesomeIcon icon={"caret-down"} />}
        {!showSub && <FontAwesomeIcon icon={"caret-up"} />}
      </span>
    );

  return (
    <tr className={row.className}>
      {columns.map((col, index) => {
        const isFirstCell = index === 0;
        const onClick = isFirstCell ? toggleSubItems : undefined;

        const content: ReactNode = col.template ? (
          typeof col.template === "string" ? (
            <span>{col.template}</span>
          ) : (
            React.createElement(col.template, { ...row })
          )
        ) : (
          row[col.field]
        );

        return (
          <td
            key={`${row[keyMap]}-${col.field}`}
            style={{
              width: `${columnWidth[index]}%`,
              paddingLeft: getPaddingLeft(isFirstCell),
            }}
            onClick={onClick}
          >
            {renderExpandIcon(isFirstCell)}
            {content}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(RowRenderer);
