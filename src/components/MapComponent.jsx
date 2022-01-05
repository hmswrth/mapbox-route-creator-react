// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { toast } from 'react-toastify';

function MapComponent({ datas, showMarks, dis, rateLimit }) {
   const [lat, setLat] = useState(20.5937);
   const [long, setLong] = useState(78.9629);
   const container = useRef();

   useEffect(() => {
      const map = new mapboxgl.Map({
         accessToken:
            "pk.eyJ1IjoiaG1zd3J0aCIsImEiOiJja3kwa2I4eXowMmh4Mm9sZ29saXJpMWg5In0.Tm8RaLRgM3UBVqPDfpzylQ",
         container: "map",
         style: "mapbox://styles/mapbox/streets-v11",
         center: [long, lat],
         zoom: 4,
      });
      var directions = new MapboxDirections({
         accessToken:
            "pk.eyJ1IjoiaG1zd3J0aCIsImEiOiJja3kwa2I4eXowMmh4Mm9sZ29saXJpMWg5In0.Tm8RaLRgM3UBVqPDfpzylQ",
         unit: "metric",
         profile: "mapbox/driving",
      });
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(directions, "bottom-left");

      if (showMarks) {
         datas.forEach((mark) => {
            var marker = new mapboxgl.Marker()
               .setLngLat([mark.longitude, mark.latitude])
               .addTo(map);
         });
      }
      if (dis) {
         dis.forEach((x, i) => {
            if (i == 0) {
               directions.setOrigin([x[0], x[1]]);
            } else if (i == dis.length - 1) {
               directions.setDestination([x[0], x[1]]);
            } else {
               directions.addWaypoint(i - 1, [x[0], x[1]]);
            }
         });
      }

      if (datas.length) {
         setLat(datas[datas.length - 1].latitude);
         setLong(datas[datas.length - 1].longitude);
      }
      // console.log("datas", datas, "marks", showMarks, "routes", dis);
   }, [datas, showMarks, dis, lat, long]);

   const sendToast = () => {
      toast.error('You exceeded your quota of 1 request for 10s interval', {
         position: "top-right",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         toastId: 'toast1'
         });
   }

   return (
      <div
      style={{
        position: "relative",
        top: "-100%",
        width: "50%",
        height: "78%",
        borderBottomRightRadius: "36px",
        left: "50%",
      }}
      id="map"
      ref={container}
    >
       {rateLimit ? sendToast() : ''}
    </div>
   )
}

export default MapComponent
