import { useTypedSelector } from "./useTypedSelector";
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { order, data } = state.cells;
    const orderedCells = order.map((id) => data[id]);
    const showfunc = `import {default as _React} from 'react'; import {default as _ReactDOM} from 'react-dom';
        const root = document.getElementById('root'); var show =(value) => {
          if(typeof value === 'object') {
            if(value.$$typeof && value.props ){
              _ReactDOM.render(value, root);
            }else {
              root.innerHTML = JSON.stringify(value);
            }
          }
          else {
            root.innerHTML = value;
          }
        }`;
    const showNoop = `var show = () => {}`;
    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(showfunc);
        } else {
          cumulativeCode.push(showNoop);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) {
        break;
      }
    }
    return cumulativeCode;
  }).join("\n");
};
