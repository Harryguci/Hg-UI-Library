import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HgCoreTreeGrid, CoreTreeGridColumn } from "./CoreTreeGrid";

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

function HgTreeGridTest(props: HgTreeGridProps) {
  const { dataSource } = props;
  const columns = [
    {
      field: "displayName",
      header: "DisplayName",
      colWidth: 50,
    },
    {
      field: "accessDate",
      header: "AccessDate",
      colWidth: 20,
    },
    {
      field: "actions",
      header: "Actions",
      colWidth: 30,
      template: (row: HgTreeGridRows) => {
        return (
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-primary p-0 fs-5 d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={(_) => alert("view " + row.displayName)}
            >
              <FontAwesomeIcon icon={"fas fa-eye"} />
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2 p-1 fs-5 d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={(_) => alert("view " + row.displayName)}
            >
              <FontAwesomeIcon icon={"fas fa-trash"} />
            </button>
          </div>
        );
      },
    },
  ] as CoreTreeGridColumn[];

  return (
    <HgCoreTreeGrid
      id={"core-tree-grid"}
      keyMap="id"
      parentKeyMap="parentId"
      columns={columns}
      dataSource={dataSource}
      tableAttributes={
        {
          // className: "table-hover",
        }
      }
    />
  );
}

export { HgTreeGridTest };
