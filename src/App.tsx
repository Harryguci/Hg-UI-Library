import { useState } from "react";
import DragDropPage from "./pages/DragDropPage";
import { TreeGridPage } from "./pages/TreeGridPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function App() {
  const [show, setShow] = useState<number | null>(-1);
  return (
    <div className="bg-white">
      <div className="btn-group w-100 p-3">
        <button
          type="button"
          className="btn btn-outline-primary d-block w-max-content py-3"
          onClick={() => setShow(0)}
        >
          <FontAwesomeIcon icon="fa-solid fa-table" />
          <span className="ms-2">TreeGrid</span>
        </button>
        <button
          type="button"
          className="btn btn-outline-primary d-block w-max-content py-3"
          onClick={() => setShow(1)}
        >
          <FontAwesomeIcon icon="fa-solid fa-hand" />
          <span className="ms-2">Draggable List</span>
        </button>
      </div>
      {show === -1 && (
        <div className="vh-100 bg-white p-3">
          <div className="alert alert-warning" role="alert">
            Please select a Demo
          </div>
        </div>
      )}
      {show === 0 && <TreeGridPage />}
      {show === 1 && <DragDropPage />}
    </div>
  );
}

export default App;
