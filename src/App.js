import React,{useRef} from 'react';
import * as ts from "@tensorflow/tfjs";
import * as facemesh from "@tensorflow-models/facemesh";
import * as Webcam from "react-webcam";
function App() {
  const WebcamRef = useRef(null);
  const canvasRef = useRef(null);
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
            textAlign: "centr",
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
            textAlign: "centr",
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
