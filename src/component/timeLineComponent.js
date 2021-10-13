import react, { useEffect, useState } from "react";
import Element from "./timeLineElement";
import Detail from "./Details";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
let optionNumber;
const TimeLineComponent = (props) => {
  const [curId, SetCurId] = useState("");
  const [showOption, setShowOption] = useState(false);
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

  const SaveData = (obj) => {
    props.changeData(obj);
    for (let num = 0; num < listToRender.length; num++) {
      if (obj.eventIndex === listToRender[num].eventIndex) {
        listToRender[num] = obj;
        break;
      }
    }
  };
  const getUniqueId = () => {
    const numberOfElement = listToRender.length - 1;
    let largeNum = Number.NEGATIVE_INFINITY;
    for (let num = 0; num <= numberOfElement; num++) {
      if (listToRender[num].eventIndex > largeNum) {
        largeNum = listToRender[num].eventIndex;
      }
    }
    const eleArray = new Array(largeNum + 2);
    for (let num = 0; num < listToRender.length; num++) {
      const index = listToRender[num].eventIndex;
      eleArray[index] = 1;
    }

    for (let num = 0; num < largeNum + 2; num++) {
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
    props.changeList(dummArray);
    SetCurId("");
  };
  console.log(curId, "the curId");
  return (
    <div className="Box">
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
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        {el.eventName}
                        <span
                          className="move-right"
                          onClick={() => {
                            optionNumber = el.eventIndex;
                            setShowOption(!showOption);
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

              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <Detail
        selectedItem={listToRender.find((x) => x.eventIndex === curId)}
        changeIt={SaveData}
      />

      <button>Submit</button>
    </div>
  );
};
export default TimeLineComponent;
