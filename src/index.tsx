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

  const [selectedValues1, setSelectedValues1] = useState<Item[]>([]);
  const [selectedValues2, setSelectedValues2] = useState<Item | undefined>(undefined);


  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>
      </div>
      <div className="Root__content">
        <div>Step 1 -- {selectedValues2 === undefined ? 0 : [selectedValues2].length} items selected:</div>
        <div>Step 2 -- {selectedValues1.length} items selected:</div>
        <br />
        <div>
          Step 1 -- stringify values {[selectedValues2].map((e) => (
            <div>{JSON.stringify(e)}</div>
          ))}
        </div>
        <div>
          Step 2 -- stringify values {selectedValues1.map((e) => (
            <div>{JSON.stringify(e)}</div>
          ))}
        </div>
      </div>
      <div className="Root__separator" />

      <h4>Let's do some comparison</h4>
      <div className="Root__select">


        <p>Step 2 : multiple selection possible</p>
        <MultiSelectDropdown multiple={true} options={selectedItems} value={selectedValues1} onChange={(o) => setSelectedValues1(o)} />

        <p> Step 1</p>

        <MultiSelectDropdown multiple={false} options={selectedItems} value={selectedValues2} onChange={(o) => setSelectedValues2(o)} />

      </div>
    </div>
  );
};

console.log(data);

ReactDOM.render(<Root />, document.getElementById("root"));
