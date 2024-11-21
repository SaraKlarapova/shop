import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Main } from './pages/Main';
import { useJwtStore } from 'stores/jwt';
import { RequireAuth } from 'utils/requireAuth';
import { RequireRole } from 'utils/requireRole';
import { AxiosJWT } from "services/axiosJWT";
import { ToastContainer } from "react-toastify";
import { MainScreen } from "pages/main-page";
import { AdminPanel } from "admin";
import { Dashboard } from "pages/dashboard";
import 'react-toastify/dist/ReactToastify.css';
import { Redirect } from "components/redirect";
import { AllCourses } from "pages/dashboard/all-courses";
import { Navbar } from "components/navbar";
import styles from './index.module.scss'
import { Course } from "pages/dashboard/course";
import { Header } from "components/header";
import { Footer } from "components/footer";
import { Contacts } from "pages/contacts";
import { About } from "pages/about";

function App() {

  const location = useLocation()

  const pathnames = location.pathname.startsWith('/auth') || location.pathname.startsWith('/admin-panel')

  return (
    <>
      <AxiosJWT />
      <ToastContainer />
      <div className={styles.wrapper}>
        <Header />
        {!pathnames ? 
          <Navbar>
            <Routes>
              {/* <Route path={"/"} element={<Redirect />}></Route> */}
              <Route path={"/"} element={<MainScreen />} />
              <Route path={"/auth/*"} element={<Main />} />
              <Route path='/courses' element={<AllCourses />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/about' element={<About />} />
              <Route path='/course/:id/*' element={<Course />}></Route>
              <Route element={<RequireAuth />}>
                <Route path={"/panel/*"} element={<Dashboard />} /> 
              </Route>
              <Route element={<RequireRole />}>
                <Route path='/admin-panel/*' element={<AdminPanel />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Navbar>
        :
          <Routes>
          {/* <Route path={"/"} element={<Redirect />}></Route> */}
            <Route path={"/"} element={<MainScreen />} />
            <Route path={"/auth/*"} element={<Main />} />
            <Route path='/courses' element={<AllCourses />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/about' element={<About />} />
            <Route path='/course/:id/*' element={<Course />} />
            <Route element={<RequireAuth />}>
              <Route path={"/panel/*"} element={<Dashboard />} /> 
            </Route>
            <Route element={<RequireRole />} >
              <Route path='/admin-panel/*' element={<AdminPanel />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        }
      </div>
      {location.pathname.startsWith('/admin-panel') ? null : <Footer />}
    </>
  );
}

export default App;
