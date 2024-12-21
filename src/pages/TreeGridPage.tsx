import { useMemo } from "react";
import {
  HgTreeGridRows,
  HgTreeGridTest,
} from "../common/treeGrid/HgTreeGridTest";
import { Guid } from "guid-typescript";

function TreeGridPage() {
  const dataSource = useMemo(
    () =>
      [
        {
          id: "item00000001",
          displayName: "Item 01",
        },
        {
          id: "item00000002",
          displayName: "Item 02",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 03",
          parentId: "item00000001",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 04",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 05",
          parentId: "item00000001",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 06",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 07",
          parentId: "item00000002",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 08",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 09",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 10",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 11",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 12",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 13",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 14",
        },
        {
          id: Guid.create().toString(),
          displayName: "Item 15",
        },
      ] as HgTreeGridRows[],
    []
  );
  return (
    <>
      <div
        className="container"
        style={{ marginTop: "2rem", minHeight: "100vh" }}
      >
        <h1 className="display-1">TreeGrid sample</h1>
        <div className="my-2">
          <HgTreeGridTest dataSource={dataSource} />
        </div>
      </div>
    </>
  );
}

export { TreeGridPage };
