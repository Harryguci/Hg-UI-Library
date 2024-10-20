import { CoreTreeGrid, CoreTreeGridColumn } from "./CoreTreeGrid";

export interface HgTreeGridRows {
  id: string;
  displayName: string;
  readonly?: boolean;
  parentId?: string;

  [key: string]: any;
}

export interface HgTreeGridProps {
  dataSource: HgTreeGridRows[];
}

function HgTreeGrid(props: HgTreeGridProps) {
  const { dataSource } = props;
  const columns = [
    {
      field: "displayName",
      header: "Tiêu đề",
      colWidth: 50,
    },
    {
      field: "accessDate",
      header: "Ngày truy cập",
      colWidth: 10,
    },
    {
      field: "actions",
      header: "Hành động",
      template: (row: HgTreeGridRows) => {
        return (
          <>
            <button
              type="button"
              className="btn btn-outline-primary mx-1"
              onClick={(_) => alert("view " + row.displayName)}
            >
              view
            </button>
            <button
              type="button"
              className="btn btn-outline-danger mx-1"
              onClick={(_) => alert("view " + row.displayName)}
            >
              delete
            </button>
          </>
        );
      },
    },
  ] as CoreTreeGridColumn[];

  return (
    <CoreTreeGrid
      id={"core-tree-grid"}
      keyMap="id"
      parentKeyMap="parentId"
      columns={columns}
      dataSource={dataSource}
      tableAttributes={{
        className: "table-hover",
      }}
    />
  );
}

export { HgTreeGrid };
