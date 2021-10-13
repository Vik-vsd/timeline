import logo from "./logo.svg";
import "./App.css";
import TimeLineComponent from "../src/component/timeLineComponent";
import Detail from "./component/Details";
import { useState } from "react";

let DUMMY_DATA = [
  {
    eventName: "barat",
    eventTime: "teiasnfona0snasf",
    eventDescription: " asfiaonfoasfa asoifnaoinf asofina sfoians foasifn a",
    eventIndex: 5,
  },
  {
    eventName: "mehendi 2",
    eventTime: "teiasnfona0snasf",
    eventDescription: " asfiaonfoasfa asoifnaoinf asofina sfoians foasifn a",
    eventIndex: 1,
  },
  {
    eventName: "dinner",
    eventTime: "teiasnfona0snasf",
    eventDescription: " asfiaonfoasfa asoifnaoinf asofina sfoians foasifn a",
    eventIndex: 2,
  },
];

function App() {
  const [arr, setArr] = useState(DUMMY_DATA);
  const changeTheData = (NewData) => {
    for (let num = 0; num < DUMMY_DATA.length; num++) {
      if (NewData.eventIndex === DUMMY_DATA[num].eventIndex) {
        DUMMY_DATA[num] = NewData;
        break;
      }
    }
    // const id = NewData.eventIndex;
    // const targetId = DUMMY_DATA.findIndex((ele) => ele.eventIndex === id);

    //DUMMY_DATA[targetId] = NewData;
    // console.log(DUMMY_DATA);
  };
  const ChangedIndexListUpdate = (list) => {
    DUMMY_DATA = list;

    setArr(list);
    console.log(DUMMY_DATA);
  };
  console.log("rendering again");
  return (
    <div className="App">
      New One
      <TimeLineComponent
        list={DUMMY_DATA}
        changeData={changeTheData}
        changeList={ChangedIndexListUpdate}
      />
    </div>
  );
}

export default App;
