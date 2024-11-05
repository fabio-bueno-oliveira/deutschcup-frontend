import { rankingTypes } from '../types/ranking';

const initialState = {
  requesting: false,
  success: false,
  error: '',
  list: [
    {
      id: '',
      id_inscrito: '',
      posicao: '',
      numero_carro: '',
      tempo: '',
      data: '',
      data_formatada: '',
      nome: '',
      sobrenome: '',
      apelido: '',
    }
  ],
}

export function rankings(state = initialState, action) {
  switch (action.type) {
    case rankingTypes.GET_RANKINGS_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case rankingTypes.GET_RANKINGS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        list: action.list
      };
    case rankingTypes.GET_RANKINGS_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        list: [
          {
            id: '',
            id_inscrito: '',
            posicao: '',
            numero_carro: '',
            tempo: '',
            data: '',
            data_formatada: '',
            nome: '',
            sobrenome: '',
            apelido: '',
          }
        ]
      };
    default:
      return state
  }
}