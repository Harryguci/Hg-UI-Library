import "./coretreegrid.css";
import { Fragment, HTMLAttributes, useMemo, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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

  const {
    id: propsId,
    className: propsClassName,
    ...htmlAttributes
  } = tableAttributes;

  const columnWidth = useMemo(() => {
    const defaultWidth = 100 / columns.length;
    return columns.map((item) => item.colWidth ?? defaultWidth);
  }, [columns]);

  const nestedData = useMemo(() => {
    const res: Record<string, any> = {};
    const visits: Record<string, boolean> = {};
    dataSource.forEach((item: any) => {
      const id = item[keyMap];
      if (visits[id]) return;
      visits[id] = true;
      if (id) {
        const child = dataSource.filter((item) => item[parentKeyMap] === id);
        item.subItems = [...child];
        for (let t of child) {
          visits[t[keyMap]] = true;
        }
      }
      res[id] = item;
    });
    return Object.values(res);
  }, [dataSource]);

  const [parentActive, setParentActive] = useState<string[]>([]);

  function RowRenderer(row: any) {
    return (
      <tr className={row.className}>
        {columns.map((col: CoreTreeGridColumn, index: number) => {
          const onClick =
            index === 0
              ? () => {
                  setParentActive((prev) => {
                    if (prev.find((p) => p === row[keyMap]))
                      return prev.filter((p) => p !== row[keyMap]);
                    return [...prev, row[keyMap]];
                  });
                }
              : () => {};

          if (col.template) {
            const isReactNode = typeof col.template !== "string";
            if (isReactNode) {
              const Template = col.template as React.FunctionComponent<any>;
              return (
                <td
                  onClick={onClick}
                  style={{ width: columnWidth[index] + "%" }}
                >
                  <Template {...row} />
                </td>
              );
            }
            return (
              <td style={{ width: columnWidth[index] + "%" }} onClick={onClick}>
                <span>{col.template as string}</span>
              </td>
            );
          } else
            return (
              <td style={{ width: columnWidth[index] + "%" }} onClick={onClick}>
                {row[col.field]}
              </td>
            );
        })}
      </tr>
    );
  }

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
            <Fragment key={row[keyMap]}>
              <RowRenderer
                {...row}
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
                row.subItems.map((row: any) => (
                  <RowRenderer {...row} className={nestedClassName} />
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { CoreTreeGrid as HgCoreTreeGrid };
