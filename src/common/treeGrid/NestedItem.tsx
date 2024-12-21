import { memo } from "react";
import { groupClassName, groupCollapsedClassName } from "./CoreTreeGrid";

// export interface NestedItemProp {}
function NestedItem({
  deepItem,
  row,
  RowRenderer,
  keyMap,
  IsRowActive,
}: {
  deepItem: number;
  row: any;
  RowRenderer: any;
  keyMap: string;
  IsRowActive: (id: string) => boolean;
}) {
  const NewRowData = {
    ...row,
    deepItem: deepItem,
    isRowActive: IsRowActive(row[keyMap]),
  };

  return (
    <>
      <RowRenderer
        {...NewRowData}
        className={
          row.subItems?.length > 0
            ? IsRowActive(row[keyMap])
              ? groupClassName
              : groupCollapsedClassName
            : ""
        }
      />
      {IsRowActive(row[keyMap]) &&
        row.subItems &&
        row.subItems.map((row2: any) => (
          <NestedItem
            key={row2[keyMap]}
            row={row2}
            RowRenderer={RowRenderer}
            keyMap={keyMap}
            IsRowActive={IsRowActive}
            deepItem={deepItem + 1}
          />
        ))}
    </>
  );
}
export default memo(NestedItem);
