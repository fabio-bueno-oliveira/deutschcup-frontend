import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { configuracoes } from './configuracoes';
import { user } from './user';
import { preinscricoes } from './preinscricoes';
import { inscricoes } from './inscricoes';
import { rankings } from './ranking';
import { localidades } from './localidades';

const rootReducer = combineReducers({
  authentication,
  configuracoes,
  user,
  preinscricoes,
  inscricoes,
  rankings,
  localidades
});

export default rootReducer;