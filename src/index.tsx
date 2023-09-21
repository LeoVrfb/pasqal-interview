import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import data from "./data.json";
import "./index.css";
import { getData, Item } from './api';
import MultiSelectDropdown from "./components/DropdownSelect";

const Root = () => {

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [searchItems, setSearchItems] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(searchItems);
      setSelectedItems(data);
    };

    fetchData();
  }, [searchItems]);

  const [selectedValues, setSelectedValues] = useState<typeof selectedItems[0] | undefined>(undefined);


  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>
      </div>
      <div className="Root__content">
        <div>{selectedValues === undefined ? 0 : [selectedValues].length} items selected:</div>
        <br />
        <div>
          {[selectedValues].map((e) => (
            <div>{JSON.stringify(e)}</div>
          ))}
        </div>
      </div>
      <div className="Root__separator" />
      <div className="Root__select">

        <MultiSelectDropdown options={selectedItems} value={selectedValues} onChange={o => setSelectedValues(o)} />

      </div>
    </div>
  );
};

console.log(data);

ReactDOM.render(<Root />, document.getElementById("root"));
