import {
  HTMLAttributes,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import "./dropArea.css";
import { DraggableAreaContext } from "./DraggableArea";
export interface DropAreaProps {
  itemIndex: number;
  htmlAttributes?: HTMLAttributes<HTMLDivElement>;
  content: JSX.Element;
  onDrop: () => any;
}

const DropArea = (props: DropAreaProps) => {
  const { content, htmlAttributes, itemIndex: _, onDrop } = props;
  const { isDragging } = useContext(DraggableAreaContext);
  const { className, ...newHtmlAttributes } = htmlAttributes ?? {};
  const [show, setShow] = useState<boolean>(false);
  // const idTimeOut = useRef<number | null>(null);

  return (
    <section
      {...newHtmlAttributes}
      onDragEnter={() => {
        // if (idTimeOut.current) {
        //   clearTimeout(idTimeOut.current);
        //   idTimeOut.current = null;
        // }
        setShow(true);
      }}
      onDragLeave={() => {
        // idTimeOut.current = setTimeout(() => {
        setShow(false);
        // }, 300);
      }}
      onDrop={() => {
        onDrop();
        setShow(false);
      }}
      onDragOver={(evt) => evt.preventDefault()}
      className={
        show
          ? ["drop-area", className ?? "d-block"].join(" ")
          : "hide-drop-area"
      }
      style={{
        height: show && isDragging ? "100%" : isDragging ? "30px" : "0px",
      }}
    >
      {content}
    </section>
  );
};

export default memo(DropArea);
