import { useActions } from "../hooks/useActionCreator";

const AppBar: React.FC<{ id: string }> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  return (
    <div className="action-bar">
      <button
        className="button is-small is-primary"
        onClick={() => moveCell(id, "up")}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <i className="fas fa-arrow-down"></i>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default AppBar;
