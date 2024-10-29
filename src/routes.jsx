import {
  Routes,
  Route,
  BrowserRouter,
  useLocation,
  Navigate,
  Outlet
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import LandingPageFull from './pages/LandingPageFull';
import Sobre from './pages/Sobre';
import Inscricao from './pages/Inscricao';
import LoginPage from './pages/Login';
import MinhaConta from './pages/MinhaConta';
import Home from './pages/Home';

function AppRoutes () {

  const loggedIn = useSelector(state => state.authentication.loggedIn);

  function RequireAuth () {
    let location = useLocation();

    if (!loggedIn) {
      return <Navigate to="/" state={{ from: location }} />;
    }

    return <Outlet />;
  }
  
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/landingOld" element={<LandingPage />} />
          <Route path="/" element={<LandingPageFull />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/conta" element={<MinhaConta />} />
          <Route element={<RequireAuth />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
}

export default AppRoutes;