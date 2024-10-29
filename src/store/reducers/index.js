import { combineReducers } from 'redux';
import { authentication } from './authentication';
import { user } from './user';
import { preinscricoes } from './preinscricoes';
import { inscricoes } from './inscricoes';
import { localidades } from './localidades';

const rootReducer = combineReducers({
  authentication,
  user,
  preinscricoes,
  inscricoes,
  localidades
});

export default rootReducer;