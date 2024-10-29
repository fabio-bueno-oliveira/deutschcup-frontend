import { preinscricoesTypes } from '../types/preinscricoes';

const initialState = {
  requesting: false,
  success: false,
  error: '',
  list: [
    {
      id: '',
      createdAt: '',
      ano_evento	: '',
      nome: '',
      email: '',
      telefone: ''
    }
  ],
}

export function preinscricoes(state = initialState, action) {
  switch (action.type) {
    case preinscricoesTypes.GET_PREINSCRICOES_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case preinscricoesTypes.GET_PREINSCRICOES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        list: action.list
      };
    case preinscricoesTypes.GET_PREINSCRICOES_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        list: [
          {
            id: '',
            createdAt: '',
            ano_evento	: '',
            nome: '',
            email: '',
            telefone: ''
          }
        ]
      };
    default:
      return state
  }
}