import { useMemo } from "react";
import {
  HgTreeGridRows,
  HgTreeGridTest,
} from "../common/treeGrid/HgTreeGridTest";
import defaultData from "./treeGridData.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CoreTreeGridColumn } from "../main";
function TreeGridPage() {
  const dataSource = useMemo(() => defaultData as HgTreeGridRows[], []);
  const columns = [
    {
      field: "displayName",
      header: "DisplayName",
      colWidth: 50,
    },
    {
      field: "status",
      header: "Status",
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
              <FontAwesomeIcon icon={"eye"} />
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2 p-1 fs-5 d-flex justify-content-center align-items-center"
              style={{ width: "40px", height: "40px" }}
              onClick={(_) => alert("view " + row.displayName)}
            >
              <FontAwesomeIcon icon={"trash"} />
            </button>
          </div>
        );
      },
    },
  ] as CoreTreeGridColumn[];
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "2rem", minHeight: "100vh" }}
      >
        <h1 className="display-1">TreeGrid sample</h1>
        <div className="my-2">
          <HgTreeGridTest dataSource={dataSource} columns={columns} />
        </div>
      </div>
    </>
  );
}

export { TreeGridPage };
