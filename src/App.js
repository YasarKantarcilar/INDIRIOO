import Login from "./Components/LoginRegister/Login";
import Register from "./Components/LoginRegister/Register";
import Main from "./Components/MainMenu/Main";
import RestaurantApplication from "./Components/RestaurantApplication/RestaurantApplication";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import Restaurant from "./Components/Restaurant/Restaurant";
import PanelNavigator from "./Components/Panels/PanelNavigator";
function App() {
  console.log(auth.currentUser);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Panel" element={<PanelNavigator />} />
        <Route path="/Restaurant/:id" element={<Restaurant />} />
        <Route
          path="/RestaurantApplication"
          element={<RestaurantApplication />}
        />
      </Routes>
    </div>
  );
}

export default App;
