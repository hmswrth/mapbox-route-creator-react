import './App.css';
import { React, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormComponent from './components/FormComponent';
import TableComponent from './components/TableComponent';
import MapComponent from './components/MapComponent';

function App() {
  const [formdata, setFormData] = useState([]);
  const [marks, setMarks] = useState(false);
  const [routeData, setRouteData] = useState([]);
  const [rateLimit, setRateLimit] = useState(false)

  const getFormData = (inp) => {
    setFormData([...formdata, inp])

  }
  const handleHome = () => {
    setFormData([]);
    setRouteData([]);
  }

  const getMarks = () => {
    setMarks(true)
  }

  const handleShowRoute = () => {
    rateLimitApi();
    let dire = [];
    formdata.forEach((x) => {
      dire.push([+x.longitude, +x.latitude]);
    });
    setRouteData(dire);
    console.log(dire)
  };

  const rateLimitApi = async () => {
    try {
      const response = await fetch('http://localhost:8080')
      const data = await response.json()
      console.log(data.message)
      if (data.message == 'Accepted!') {
        setRateLimit(false)
      }
      else {
        setRateLimit(true)
      }
    } catch (error) {
      setRateLimit(true)
      console.log(error)
    }
  }

  return (
    <div className="App">
      <button className="home" onClick={handleHome}>
        HOME
      </button>
      <div className="container">
        <FormComponent onADD={getFormData} marks={getMarks} />
        <TableComponent data={formdata} show={handleShowRoute} />
        <MapComponent datas={formdata} showMarks={marks} dis={routeData} rateLimit={rateLimit} />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
