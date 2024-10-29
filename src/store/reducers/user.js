import { userTypes } from '../types/users';

const initialState = {
  id: '',
  nome: '',
  sobrenome: '',
  email: '',
  status: '',
  nivel: ''
}

export function user(state = initialState, action) {
  switch (action.type) {
    case userTypes.GET_USER_INFO_REQUEST:
      return {
        ...state,
        requesting: true
      };
    case userTypes.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        requesting: false,
        id: action.info.id,
        nome: action.info.nome,
        sobrenome: action.info.sobrenome,
        email: action.info.email,
        status: action.info.status,
        nivel: action.info.nivel
      };
    case userTypes.GET_USER_INFO_FAILURE:
      return {
        ...state,
        requesting: false,
        error: "A solicitação falhou"
      };
    default:
      return state
  }
}