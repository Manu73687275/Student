 import { BrowserRouter, Route, Routes } from "react-router-dom";
 import Navbar from "./components/Navbar";
 import Login from "./pages/Login.jsx";
 import Signup from "./pages/Signup.jsx";
import Found from "./components/Found.jsx";
import Buttons from "./pages/Buttons.jsx";
import Add from "./pages/Add.jsx";
import Read from "./pages/Read.jsx";
import Update from "./pages/Update.jsx";
import Delete from "./pages/Delete.jsx";
 function App() {
 return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar/>}></Route>
       <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/found" element={<Found/>}></Route>
        <Route path="/middle" element={<Buttons/>}></Route>
        <Route path="/Add" element={<Add/>}></Route>
        <Route path="/read" element={<Read/>}></Route>
        <Route path="/update" element={<Update/>}></Route>
        <Route path="/delete" element={<Delete/>}></Route>
      </Routes>
        
  </BrowserRouter>
 )
}


export default App;