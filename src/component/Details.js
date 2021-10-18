import React, { useEffect, useRef, useState } from "react";

const Detail = (props) => {
  // const formRef = useRef({ name: "", time: "", description: "" });
  // const obj = {
  //   eventName: formRef.current["name"].value,
  //   eventTime: formRef.current["time"].value,
  //   eventDescription: formRef.current["description"].value,
  //   eventIndex:
  //     props.selectedItem === undefined ? "" : props.selectedItem.eventIndex,
  // };
  // console.log("saving the ->", obj);
  //props.changeIt(obj);
  //props.changeIt(obj);
  const SelectedObject = props.selectedItem;
  console.log("selected value", SelectedObject);
  //let nameVar = SelectedObject === undefined ? "" : SelectedObject.eventName;
  let index = SelectedObject === undefined ? "" : SelectedObject.eventIndex;
  const inputRefName = useRef();
  const inputRefDescript = useRef();
  const inputRefTime = useRef();
  useEffect(() => {
    inputRefName.current.value =
      SelectedObject === undefined ? "" : SelectedObject.eventName;
    inputRefTime.current.value =
      SelectedObject === undefined ? "" : SelectedObject.eventTime;
    inputRefDescript.current.value =
      SelectedObject === undefined ? "" : SelectedObject.eventDescription;
    console.log("the value", inputRefName.current.value);
  }, [index]);

  const onchangeName = () => {
    let nameVar = inputRefName.current.value;
    const newObj = { ...SelectedObject, eventName: nameVar };
    props.changeIt(newObj);
  };
  const onchangeDescription = () => {
    let desVar = inputRefDescript.current.value;
    const newObj = { ...SelectedObject, eventDescription: desVar };
    props.changeIt(newObj);
  };
  const onchangeTime = () => {
    let timeVar = inputRefName.current.value;
    const newObj = { ...SelectedObject, eventTime: timeVar };
    props.changeIt(newObj);
  };
  const removeDefault = (e) => {
    e.preventDefault();
  };
  const keyDownHandle = (e) => {
    if (e.key === "Enter") {
      props.onEnter();
    }
  };
  return (
    <form onSubmit={removeDefault} className="form">
      <div>
        <label htmlFor="name">EventName</label>
        <input
          id="name"
          ref={inputRefName}
          onChange={onchangeName}
          onKeyDown={keyDownHandle}
        />
      </div>
      <div>
        <label htmlFor="time">Time</label>
        <input
          id="time"
          ref={inputRefTime}
          onChange={onchangeName}
          onKeyDown={keyDownHandle}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          id="description"
          ref={inputRefDescript}
          onChange={onchangeName}
          onKeyDown={keyDownHandle}
        />
      </div>
    </form>
  );
};

export default Detail;

//ref={(el) => (formRef.current["name"] = el)}
// placeholder={
//   props.selectedItem === undefined ? "" : props.selectedItem.eventName
// }
//

{
  /* <label htmlFor="time">EventTime</label>
      <input
        id="time"
        ref={(el) => (formRef.current["time"] = el)}
        placeholder={
          props.selectedItem === undefined ? "" : props.selectedItem.eventTime
        }
        // value={
        //   props.selectedItem === undefined ? "" : props.selectedItem.eventTime
        // }
      />

      <label htmlFor="description">EventTime</label>
      <input
        id="description"
        ref={(el) => (formRef.current["description"] = el)}
        placeholder={
          props.selectedItem === undefined
            ? ""
            : props.selectedItem.eventDescription
        }
        // value={
        //   props.selectedItem === undefined
        //     ? ""
        //     : props.selectedItem.eventDescription
        // }
      /> */
}
