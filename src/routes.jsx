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
import LandingPage from './pages/LandingPageFull';
import Sobre from './pages/Sobre';
import Inscricao from './pages/Inscricao';
import LoginPage from './pages/Login';
import MinhaConta from './pages/Admin/MinhaConta';
import Home from './pages/Admin/Home';
import Configuracoes from './pages/Admin/Configuracoes';
import InscricaoDetalhe from './pages/Admin/InscricaoDetalhe';
import Ranking from './pages/Admin/Ranking';
import RankingNovo from './pages/Admin/Ranking/novo';

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
          <Route path="/" element={<LandingPage />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/inscricao" element={<Inscricao />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/inscricao/:inscricaoId" element={<InscricaoDetalhe />} />
            <Route path="/admin/ranking" element={<Ranking />} />
            <Route path="/admin/ranking/novo" element={<RankingNovo />} />
            <Route path="/admin/configuracoes" element={<Configuracoes />} />
            <Route path="/admin/minha-conta" element={<MinhaConta />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    )
}

export default AppRoutes;