
import './App.css';
import axios from "axios";
import {useEffect} from "react";
import GraphComponent from './GraphComponent'; 
import EventForm from './components/EventForm';

// ### Test json Data ###
const jsonData = [
  { x: "1", y: 13, pic: "test_usc.png", name: "name" },
  { x: "2", y: 44, pic: "image_url_2", name: "name" },
  { x: "3", y: 27, pic: "image_url_3", name: "name" },
  { x: "4", y: 71, pic: "image_url_4", name: "name" },
  { x: "5", y: -87, pic: "image_url_5", name: "name" },
  { x: "6", y: -50, pic: "image_url_6", name: "name" },
  { x: "7", y: 27, pic: "image_url_7", name: "name" },
  { x: "8", y: 68, pic: "image_url_8", name: "name" },
  { x: "9", y: -13, pic: "image_url_9", name: "name" },
  { x: "10", y: 54, pic: "image_url_10", name: "name" },
  { x: "11", y: 57, pic: "image_url_11", name: "name" },
  { x: "12", y: 42, pic: "image_url_12", name: "name" }
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
