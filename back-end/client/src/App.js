
import './App.css';
import axios from "axios";
import {useEffect} from "react";
import GraphComponent from './GraphComponent'; 
import EventForm from './components/EventForm';


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
      <GraphComponent />
      <EventForm />
  </div>
  );
}

export default App;
