import react, { useEffect, useState } from "react";
import Element from "../timeLineElement";
import Detail from "../Details";
import BD from "../backDrop";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Styles from "./TimeLine.module.css";
let optionNumber;
const TimeLineComponent = (props) => {
  const [curId, SetCurId] = useState("");
  const [showOption, setShowOption] = useState(false);
  const [reloading, setReloading] = useState(false);
  const listToRender = props.list;

  // const onlyIndexArray = props.list.map((x) => {
  //   return x.eventIndex;
  // });
  //const [sequence, setSequence] = useState(onlyIndexArray);
  //const  corpusArray = [...props.list];
  //console.log("array", onlyIndexArray);
  // props.list.sort((a, b) => {
  //   return a.eventIndex - b.eventIndex;
  // });
  // console.log(props.changeData);

  function handleOnDragEnd(result) {
    console.log(result);
    if (!result.destination) return;

    // const items = Array.from(characters);
    const dummArray = [...listToRender];
    const [reorderedItem] = dummArray.splice(result.source.index, 1);
    dummArray.splice(result.destination.index, 0, reorderedItem);
    // for (let i = 0; i < dummArray.length; i++) {
    //   dummArray[i].eventIndex = i;
    // }
    // console.log(dummArray);

    props.changeList(dummArray);

    //   updateCharacters(items);
  }
  const onEnterHandler = () => {
    console.log("ging to change list now");
    setReloading(!reloading); // just to rerender
  };
  const SaveData = (obj) => {
    for (let num = 0; num < listToRender.length; num++) {
      // saving in local copy of lis also
      if (obj.eventIndex === listToRender[num].eventIndex) {
        listToRender[num] = obj;
        break;
      }
    }
    props.changeData(obj);
  };
  const getUniqueId = () => {
    const numberOfElement = listToRender.length - 1;
    let largeNum = Number.NEGATIVE_INFINITY;
    for (let num = 0; num <= numberOfElement; num++) {
      if (listToRender[num].eventIndex > largeNum) {
        largeNum = listToRender[num].eventIndex;
      }
    }
    const eleArray = new Array(largeNum + 3); // 1for extra ele, 1 for 1 indexed, 1 for as listto render will start from 0
    for (let num = 0; num < listToRender.length; num++) {
      const index = listToRender[num].eventIndex;
      eleArray[index] = 1;
    }

    for (let num = 1; num < largeNum + 3; num++) {
      if (eleArray[num] === undefined) {
        eleArray[num] = 1;
        return num;
      }
    }
    return 0;
  };
  const upHandler = (something) => {
    const obj = {
      eventName: "edit me",
      eventTime: "",
      eventDescription: "",
      eventIndex: getUniqueId(),
    };
    const dummArray = [...listToRender];
    const position = dummArray.findIndex((x) => x.eventIndex === something);
    dummArray.splice(position, 0, obj);
    optionNumber = -1;
    props.changeList(dummArray);
    setShowOption(false);
    SetCurId(obj.eventIndex);
  };
  const downHandler = (something) => {
    const obj = {
      eventName: "edit me",
      eventTime: "",
      eventDescription: "",
      eventIndex: getUniqueId(),
    };
    const dummArray = [...listToRender];
    const position = dummArray.findIndex((x) => x.eventIndex === something);
    dummArray.splice(position + 1, 0, obj);

    props.changeList(dummArray);
    optionNumber = -1;
    setShowOption(false);
    SetCurId(obj.eventIndex);
  };
  const removeHandler = (something) => {
    const dummArray = [...listToRender];
    const position = dummArray.findIndex((x) => x.eventIndex === something);
    dummArray.splice(position, 1);
    optionNumber = -1;
    if (dummArray.length === 0) {
      const obj = {
        eventName: "edit me",
        eventTime: "",
        eventDescription: "",
        eventIndex: getUniqueId(),
      };
      const arr = [];
      arr.push(obj);
      console.log(arr, "arr");
      props.changeList(arr);
    } else {
      props.changeList(dummArray);
    }

    SetCurId("");
  };
  const closeTheOption = () => {
    if (showOption === true) {
      setShowOption(false);
    }
  };
  return (
    <BD show={true} closeTheOption={closeTheOption}>
      <div className={Styles.boxContainer}>
        <div className={Styles.Box}>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {listToRender.map((el, index) => {
                    return (
                      <Draggable
                        key={`${el.eventIndex}`}
                        draggableId={`${el.eventIndex}`}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            value={el.eventIndex}
                            onClick={(event) => {
                              SetCurId(event.target.value);
                            }}
                            className={Styles.liEvent}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <span>{el.eventName}</span>
                            <span
                              className="move-right"
                              onClick={() => {
                                optionNumber = el.eventIndex;
                                setShowOption(true);
                              }}
                            >
                              pen
                            </span>
                            {showOption && optionNumber === el.eventIndex && (
                              <ul className="option-box">
                                <li
                                  onClick={() => {
                                    upHandler(el.eventIndex);
                                  }}
                                  className="sameLine"
                                >
                                  Up
                                </li>
                                <li
                                  onClick={() => {
                                    downHandler(el.eventIndex);
                                  }}
                                  className="sameLine"
                                >
                                  Top
                                </li>
                                <li
                                  onClick={() => {
                                    removeHandler(el.eventIndex);
                                  }}
                                  className="sameLine"
                                >
                                  Remove
                                </li>
                              </ul>
                            )}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}

                  <div style={{ visibility: "hidden" }}>
                    {provided.placeholder}
                  </div>
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <Detail
            selectedItem={listToRender.find((x) => x.eventIndex === curId)}
            changeIt={SaveData}
            onEnter={onEnterHandler}
          />
        </div>
        <button>Submit</button>
      </div>
    </BD>
  );
};
export default TimeLineComponent;
