import { Routes, Route, useLocation } from "react-router-dom";
import { Main } from './pages/Main';
import { useJwtStore } from 'stores/jwt';
import { RequireAuth } from 'utils/requireAuth';
import { RequireRole } from 'utils/requireRole';
import { AxiosJWT } from "services/axiosJWT";
import { ToastContainer } from "react-toastify";
import { MainScreen } from "admin/main";
import { AdminPanel } from "admin";
import { Dashboard } from "pages/dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "components/redirect";

function App() {
  return (
    <>
      <AxiosJWT />
      <ToastContainer />
      <Routes>
        <Route path={"/"} element={<Redirect />}></Route>
        <Route path={"/auth/*"} element={<Main />}></Route>
        <Route element={<RequireAuth />} >
          <Route path={"/panel/*"} element={<Dashboard />}></Route>
        </Route>
        <Route element={<RequireRole />} >
          <Route path='/admin-panel/*' element={<AdminPanel />}></Route>
        </Route>
      </Routes>
      {/* {location.pathname.startsWith('/admin-panel') ? null : <Footer />} */}
    </>
  );
}

export default App;
