import "./coretreegrid.css";
import { HTMLAttributes, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NestedItem from "./NestedItem";
import RowRenderer from "./RowRenderer";

export interface CoreTreeGridColumn {
  field: string;
  header?: string | JSX.Element;
  template?: string | React.FunctionComponent<any>;
  colWidth?: number;
}

export interface CoreTreeGridProps {
  id?: string;
  dataSource: any[];
  keyMap: string;
  parentKeyMap?: string;
  columns: CoreTreeGridColumn[];

  tableAttributes?: HTMLAttributes<HTMLTableElement>;
}

export const nestedClassName = "treegrid-nested";
export const groupClassName = "treegrid-group";
export const groupCollapsedClassName = groupClassName + " collapsed";

function CoreTreeGrid(props: CoreTreeGridProps) {
  const {
    id,
    dataSource,
    keyMap,
    parentKeyMap = "parentId",
    columns,
    tableAttributes = {},
  } = props;
  const maxDeptFind = 50;
  const {
    id: propsId,
    className: propsClassName,
    ...htmlAttributes
  } = tableAttributes;

  const columnWidth = useMemo(() => {
    const defaultWidth = 100 / columns.length;
    return columns.map((item) => item.colWidth ?? defaultWidth);
  }, [columns]);

  function getChild(
    root: any,
    dataSource: any[],
    visits: Record<string, boolean>,
    deep: number = 0
  ) {
    if (deep > maxDeptFind) return [];
    let res = { ...root };
    res.subItems = [] as any[];
    let child = dataSource.filter((p) => p.parentId === root[keyMap]);
    child =
      child && child.length > 0
        ? child.map((p) => getChild(p, dataSource, visits, deep + 1))
        : [];
    res.subItems = child;
    child.forEach((p) => {
      visits[p[keyMap]] = true;
    });
    visits[res[keyMap]] = true;
    return res;
  }

  const nestedData = useMemo(() => {
    const res: Record<string, any> = {};
    const visits: Record<string, boolean> = {};

    dataSource.forEach((item: any) => {
      const id = item[keyMap];
      if (visits[id]) return;
      visits[id] = true;
      if (id) {
        let child = dataSource.filter((item) => item[parentKeyMap] === id);
        child = child.map((p) => getChild(p, dataSource, visits));
        item.subItems = [...child];
      }
      res[id] = item;
    });
    return Object.values(res);
  }, [dataSource]);

  const [parentActive, setParentActive] = useState<string[]>([]);

  function IsRowActive(rowId: string) {
    return parentActive.findIndex((item) => item === rowId) >= 0;
  }

  return (
    <div className="hg-treegrid-wrapper">
      <table
        id={id || propsId || ""}
        className={"table hg-treegrid " + propsClassName}
        {...htmlAttributes}
      >
        <thead className="hg-treegrid__header">
          <tr>
            {columns.map((col: CoreTreeGridColumn, index: number) => (
              <th
                scope="col"
                key={col.field}
                style={{ width: columnWidth[index] + "%" }}
              >
                {col.header || col.field}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="hg-treegrid__content">
          {nestedData.map((row: any) => (
            <NestedItem
              key={row[keyMap]}
              row={row}
              RowRenderer={(row: any) => (
                <RowRenderer
                  row={row}
                  columns={columns}
                  setParentActive={setParentActive}
                  keyMap={keyMap}
                  columnWidth={columnWidth}
                />
              )}
              keyMap={keyMap}
              IsRowActive={IsRowActive}
              deepItem={0}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { CoreTreeGrid as HgCoreTreeGrid };
