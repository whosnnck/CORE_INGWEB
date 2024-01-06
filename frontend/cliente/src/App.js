import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import MovieC from "./components/MovieC";
import MovieR from "./components/MovieR";
import RegisterNormal from "./components/RegisterNormal";
import EditPage from "./components/EditForm";
import CRUDAdmin from "./components/CRUDAdmin";
import {PrivateRoute} from "./controllers/PrivateRoute";
import Reporte from "./components/Reporte"
//import {PrivateAdmin} from "./controllers/PrivateAdmin";
import Calificar from "./components/Calificacion";
const App = () => {

  const isAuthenticated = localStorage.getItem("token") !== null;

  return <BrowserRouter>
    <div>
      <Routes>
        <Route path="/register" element={<RegisterNormal />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/registerUser" element={<Register/>}/>
        <Route 
          path="/crudadmin" 
          element={<CRUDAdmin />} 
          />
        <Route path="/movies/:id" element={<Calificar/>}/>

        <Route
            path="/welcome/:id"
            element={<PrivateRoute element={<Welcome />} isAuthenticated={isAuthenticated} fallbackPath="/login" />}
          />
          <Route
            path="/movie/create"
            element={<PrivateRoute element={<MovieC />} isAuthenticated={isAuthenticated} fallbackPath="/login" />}
          />
        <Route path="/" element={<MovieR />}/>
        <Route
            path="/edit/movies/:id"
            element={<PrivateRoute element={<EditPage />} isAuthenticated={isAuthenticated} fallbackPath="/login" />}
          />
        <Route
            path="/reportePelicula"
            element={<PrivateRoute element={<Reporte />} isAuthenticated={isAuthenticated} fallbackPath="/login" />}
          />
       
      </Routes>
    </div>
    </BrowserRouter>
}

export default App;
