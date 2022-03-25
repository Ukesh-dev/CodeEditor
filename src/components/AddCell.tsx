import "./addCell.css";
import { useActions } from "../hooks/useActionCreator";

interface AddCellInterface {
  id: string | null;
  isForceVisible: boolean;
}

const AddCell: React.FC<AddCellInterface> = ({ id, isForceVisible }) => {
  const { insertCellAfter } = useActions();
  return (
    <div className={`divider ${isForceVisible && "visible"}`}>
      <button
        className="button is-primary is-rounded"
        onClick={() => insertCellAfter(id, "code")}
      >
        <span>
          <i className="fas fa-plus"></i>
        </span>
        <span>Code</span>
      </button>
      <button
        className="button is-primary is-rounded"
        onClick={() => insertCellAfter(id, "text")}
      >
        <span>
          <i className="fas fa-plus"></i>
        </span>
        <span>Text</span>
      </button>
    </div>
  );
};
export default AddCell;
