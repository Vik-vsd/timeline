// import react, { useEffect, useState } from "react";
// import Element from "./timeLineElement";
// import Detail from "./Details";

// const TimeLineComponent = (props) => {
//   const [curId, SetCurId] = useState("");

//   //const  corpusArray = [...props.list];

//   // console.log(props.changeData);

//   const SaveData = (obj) => {
//     props.changeData(obj);
//   };
//   return (
//     <div className="Box">
//       <ul>
//         {props.list.map((el) => {
//           return (
//             <li
//               key={el.eventIndex}
//               value={el.eventIndex}
//               onClick={(event) => {
//                 SetCurId(event.target.value);
//               }}
//               onDragStart={}
//             >
//               {el.eventName}
//             </li>
//           );
//         })}
//       </ul>
//       <Detail selectedItem={props.list[curId]} changeIt={SaveData} />

//       <button>Submit</button>
//     </div>
//   );
// };
// export default TimeLineComponent;

// import react, { useEffect, useState } from "react";
// import Element from "./timeLineElement";
// import Detail from "./Details";

// const TimeLineComponent = (props) => {
//   const [curId, SetCurId] = useState("");

//   //const  corpusArray = [...props.list];

//   // console.log(props.changeData);
//   const DragOver = (ev) => {
//     ev.preventDefault();

//     console.log(ev);
//     // const dragging = document.querySelector(".dragging");
//     // console.log(dragging);

//     // console.log(draggable);
//   };
//   const DragStart = (ev) => {
//     // console.log("im dragiging", ev.target);
//     ev.target.classList.add(".dragging");
//     console.log("im dragiging", ev.target);
//   };
//   const DragEnd = (ev) => {
//     ev.target.classList.remove(".dragging");
//     const container = document.querySelector("#task");

//     container.appendChild(ev.target);
//     setTimeout(() => {}, 100);
//     //ev.target.appendChild(draggable);
//     console.log("stopped dragiging", ev.target);
//   };
//   const SaveData = (obj) => {
//     props.changeData(obj);
//   };
//   return (
//     <div className="Box" id="Outer">
//       <ul id="task" onDragOver={DragOver}>
//         {props.list.map((el) => {
//           return (
//             <li
//               id={el.eventName}
//               key={el.eventIndex}
//               value={el.eventIndex}
//               onClick={(event) => {
//                 SetCurId(event.target.value);
//               }}
//               onDragStart={DragStart}
//               onDragEnd={DragEnd}
//               draggable="true"
//             >
//               {el.eventName}
//             </li>
//           );
//         })}
//       </ul>
//       <Detail selectedItem={props.list[curId]} changeIt={SaveData} />

//       <button>Submit</button>
//     </div>
//   );
// };
// export default TimeLineComponent;
