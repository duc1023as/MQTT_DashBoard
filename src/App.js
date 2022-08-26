import TopBar from "../src/components/topbar/TopBar"
import Footer from "./components/footer/Footer";
import SideBar from "./components/sidebar/SideBar";
import "./app.css";
import Home from "../src/pages/home/Home";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Trend from "./pages/trend/Trend";
import Alarm from "./pages/alarm/Alarm";
import Report from "./pages/report/Report";



function App() {
  return (
    <BrowserRouter>
      <TopBar></TopBar>
      <Routes className="container">
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/trend" element={<Trend></Trend>}></Route>
        <Route path="/alarm" element={<Alarm></Alarm>}></Route>
        <Route path="Report" element={<Report></Report>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
