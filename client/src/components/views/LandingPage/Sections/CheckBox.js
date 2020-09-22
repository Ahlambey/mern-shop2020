import React, { useState, useEffect } from "react";
import { Checkbox, Collapse } from "antd";
import { v4 as uuidv4 } from "uuid";
import{continents} from './data'



const { Panel } = Collapse;

export default function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  const handleToggle = (id) => {
    let currentIndex = Checked.indexOf(id);
    let newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxList = () => {
    return continents.map((value) => (
      <React.Fragment key={uuidv4()}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={Checked.indexOf(value._id) === -1? false: true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="continent" key="1">
          {renderCheckboxList()}
        </Panel>
      </Collapse>
    </div>
  );
}
