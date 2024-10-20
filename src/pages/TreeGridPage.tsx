import { useMemo } from "react";
import { HgTreeGridRows, HgTreeGrid } from "../common/treeGrid/HgTreeGrid";
import { Guid } from "guid-typescript";
import "bootstrap/dist/css/bootstrap.min.css";

function TreeGridPage() {
  const dataSource = useMemo(
    () =>
      [
        {
          id: "item00000001",
          displayName: "Item 01",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 02",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 03",
          parentId: "item00000001",
        },
      ] as HgTreeGridRows[],
    []
  );
  return (
    <>
      <div className="container my-5">
        <HgTreeGrid dataSource={dataSource} />
      </div>
    </>
  );
}

export { TreeGridPage };
