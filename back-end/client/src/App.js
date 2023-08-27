
import './App.css';
import axios from "axios";
import {useEffect} from "react";
import GraphComponent from './GraphComponent'; 
import EventForm from './components/EventForm';

// ### Test json Data ###
const jsonData = [
  { x: "1", y: 13, pic: "http://localhost:3000/img/img1.png", name: "soccer" },
  { x: "2", y: 44, pic: "http://localhost:3000/img/img2.png", name: "trip2" },
  { x: "3", y: 27, pic: "http://localhost:3000/img/img3.png", name: "trip3" },
  { x: "4", y: 93, pic: "http://localhost:3000/img/img4.png", name: "trip4" },
  { x: "5", y: -87, pic: "http://localhost:3000/img/img5.png", name: "trip5" },
  { x: "6", y: -50, pic: "http://localhost:3000/img/img6.png", name: "trip6" },
  { x: "7", y: 27, pic: "http://localhost:3000/img/img7.png", name: "trip7" },
  { x: "8", y: 68, pic: "http://localhost:3000/img/img8.png", name: "trip8" },
  { x: "9", y: -13, pic: "http://localhost:3000/img/img9.png", name: "trip9" },
  { x: "10", y: 54, pic: "http://localhost:3000/img/img10.png", name: "trip10" },
  { x: "11", y: 57, pic: "http://localhost:3000/img/img11.png", name: "marriage" },
  { x: "12", y: 42, pic: "http://localhost:3000/img/img12.png", name: "retirement" },
];

// ########################

function App() {
  const callApi = async () => {
    axios.get('/')
    .then((res) => {
      console.log(res.data.test)
    })
    .catch((err) => {
      console.log(err);
    })
  };

  useEffect(() => {
    callApi();
  }, []);

  return (

  <div>
      <GraphComponent jsonData={jsonData}/>
      <EventForm />
  </div>
  );
}

export default App;