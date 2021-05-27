import React from "react";
import Side from './components/side'
import Upload from './components/upload'
export default function App() {
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div >
        <div >
          <Side /> 
        </div>
        <div>
        <Upload/>
        </div>
      </div>
    </div>
  );
}
