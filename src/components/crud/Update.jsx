// import React,{useState} from "react";
// import Axios from "axios";


// const Update = (props) => {
//   const [days, setDays] = useState(0);
//   const [newFoodName, setnewFoodName] = useState([]);
//   const [fileName, setFileName] = useState("");
//   const [foodList, setFoodList] = useState([]);


//   const reload = () => {
//     window.location.reload();
//   };

//   // form tag
//   const onChangeFile = (e) => {
//     setFileName(e.target.files[0]);
//   };

//   const changeOnClick = (e) => {
//     e.preventDefault();

//     const formData = new FormData();

//     formData.append("newFoodName", newFoodName);
//     formData.append("days", days);
//     formData.append("articleImage", fileName);

//     setnewFoodName("");
//     setDays("");
//     setFileName("");

//     Axios.put(`http://localhost:8080/update/${props.match.params.id}`, formData)
//       .then((res) => setFoodList(res.data))
//       .catch((err) => {
//         console.log(err);
//         reload();
//       });
//   };
// };




// this is to update
  // const updatefood = (id) =>{
  //           Axios.put('http://localhost:8080/update',{
  //                     id: id,
  //                     newFoodName: newFoodName,
  //                     days: days,
  //                     articleImage: fileName,

  //           });
  //           window.location.reload()
  // }



  // const addToList = () => {
  //   Axios.post("http://localhost:8080/insert",formData );
  //   window.location.reload();
  // };

  // this is to read data

// export default Update;
