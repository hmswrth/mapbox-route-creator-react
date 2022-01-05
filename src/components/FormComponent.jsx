import React,{useState, useEffect, useRef} from 'react'

function FormComponent({ onADD,marks }) {
   const formRef = useRef();
   const [button, setButton] = useState(true);
   const inputObj = {
      location: "",
      latitude: "",
      longitude: "",
   }
   const [inputs, setInputs] = useState(() => inputObj);
   const onChange = (e) => {
      setInputs({ ...inputs, [e.target.id]: e.target.value });
   };

   const submit = (e) => {
      e.preventDefault();
      onADD(inputs);
      setInputs(inputObj);
      formRef.current.reset();
   };

   useEffect(() => {
      if (
         inputs.location.length === 0 &&
         inputs.latitude.length === 0 &&
         inputs.longitude.length === 0
      ) {
         setButton(true);
      } else {
         setButton(false);
      }
   }, [inputs]);
   return (
      <div className="form">
         <form onSubmit={submit} ref={formRef}>
            <div>
               <label for="location">Location Name</label> <br />
               <input
                  type="text"
                  id="location"
                  placeholder="Location"
                  onChange={onChange}
                  required
               />
            </div>
            <div>
               <label for="location">Enter Latitude</label> <br />
               <input
                  type="text"
                  id="latitude"
                  placeholder="Lat"
                  onChange={onChange}
                  required
               />
            </div>
            <div>
               <label for="location">Enter Longitude</label> <br />
               <input
                  type="text"
                  id="longitude"
                  placeholder="Lon"
                  onChange={onChange}
                  required
               />
            </div>
            <div>
               <br />
               {button ? (
                  <button type="button" className="formButton" onClick={marks}>
                     SUBMIT
                  </button>
               ) : (
                  <button type="submit" className="addButton">
                     ADD
                  </button>
               )}
            </div>
         </form>
      </div>
   )
}

export default FormComponent
