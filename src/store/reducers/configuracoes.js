import { configuracoesTypes } from '../types/configuracoes';

const initialState = {
  requesting: false,
  success: false,
  error: '',
  list: [
    {
      id: '',
      funcionalidade: '',
      status: ''
    }
  ],
}

export function configuracoes(state = initialState, action) {
  switch (action.type) {
    case configuracoesTypes.GET_CONFIGURACOES_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case configuracoesTypes.GET_CONFIGURACOES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        list: action.list
      };
    case configuracoesTypes.GET_CONFIGURACOES_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        list: [
          {
            id: '',
            funcionalidade: '',
            status: ''
          }
        ]
      };
    default:
      return state
  }
}