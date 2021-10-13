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
  useEffect(() => {
    inputRefName.current.value =
      SelectedObject === undefined ? "" : SelectedObject.eventName;
    console.log("the value", inputRefName.current.value);
  }, [index]);

  const onchangeName = () => {
    let nameVar = inputRefName.current.value;
    const newObj = { ...SelectedObject, eventName: nameVar };
    props.changeIt(newObj);
  };
  return (
    <form>
      <label htmlFor="name">EventName</label>
      <input
        id="name"
        //ref={(el) => (formRef.current["name"] = el)}
        // placeholder={
        //   props.selectedItem === undefined ? "" : props.selectedItem.eventName
        // }
        //
        ref={inputRefName}
        onChange={onchangeName}
      />

      {/* <label htmlFor="time">EventTime</label>
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
      /> */}
    </form>
  );
};

export default Detail;
