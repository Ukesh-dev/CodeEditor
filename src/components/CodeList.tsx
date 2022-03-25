import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import AddCell from "./AddCell";
import CodeListItem from "./CodeListItem";

const CodeList = () => {
  const cell = useTypedSelector(({ cells: { data, order } }) =>
    order.map((id) => data[id])
  );
  //   const dispatch = useDispatch();
  //   dispatch(actionCreator.updateCell("fwefw", "wefwef"));
  //   const { insertCellBefore } = useActions();
  //   insertCellBefore("wefwefw", "code");
  //   insertCellBefore("wefwefwe", "text");

  const renderedCells = cell.map((cell) => (
    <React.Fragment key={cell.id}>
      <CodeListItem cell={cell} />
      <AddCell isForceVisible={false} id={cell.id} />
    </React.Fragment>
  ));

  return (
    <div className="main">
      <AddCell id={null} isForceVisible={cell.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CodeList;
