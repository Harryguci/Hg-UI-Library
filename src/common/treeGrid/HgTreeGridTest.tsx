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
  columns: CoreTreeGridColumn[];
}

function HgTreeGridTest(props: HgTreeGridProps) {
  const { dataSource, columns } = props;

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
