
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import Webcam from "react-webcam";
import {drawMesh} from './utilities.js'
function App() {
  const WebcamRef = useRef(null);
  const canvasRef = useRef(null);
  //Load face
  const runfacemesh = async() => {
    const net = await facemesh.load({
      inputResolution : {width : 640,height:480},
      scale:0.8,
    });
    setInterval(() => {
      detect(net)
    },100)
  };

  //Detect Face
  const detect  = async(net) => {
    if(typeof WebcamRef.current != "undefined" && 
      WebcamRef.current != null && 
      WebcamRef.current.video.readyState === 4){
        const video = WebcamRef.current.video;
        const videoWidth = WebcamRef.current.video.videoWidth;
        const videoHeight = WebcamRef.current.video.videoHeight;

        WebcamRef.current.video.width = videoWidth;
        WebcamRef.current.video.height = videoHeight;


        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        const face = await net.estimateFaces(video);
        console.log(face);

        const ctx = canvasRef.current.getContext("2d");
        requestAnimationFrame(()=>{drawMesh(face, ctx)});

      }
  }
 useEffect(()=>{runfacemesh()}, []);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam ref={WebcamRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
        
        />
          
          <canvas 
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
          }}
          ></canvas>
        
      </header>
    </div>
  );
}

export default App;
