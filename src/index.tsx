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

  return (
    <div className="Root">
      <div className="Root__header">
        <h1>Pasqal interviews</h1>
        <h1>Multiselect</h1>

      </div>
      <div className="Root__content">
        <div>Step 3 -- {selectedValues1.length} items selected:</div>
        <br />
        <div>
          Step 3 -- stringify values {selectedValues1.map((e) => (
            <div>{JSON.stringify(e)}</div>
          ))}
        </div>
      </div>
      <div className="Root__separator" />
      <div className="Root__select">


        <p>Step 3 : multiple selection possible with a searchbar</p>
        <MultiSelectDropdown multiple={true} options={selectedItems} value={selectedValues1} onChange={(o) => setSelectedValues1(o)} />

        {/* <p> Step 1</p>

        <MultiSelectDropdown multiple={false} options={selectedItems} value={selectedValues2} onChange={(o) => setSelectedValues2(o)} /> */}

      </div>
    </div>
  );
};

console.log(data);

ReactDOM.render(<Root />, document.getElementById("root"));
