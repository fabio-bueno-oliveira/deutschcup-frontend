import { inscricoesTypes } from '../types/inscricoes';

const initialState = {
  requesting: false,
  success: false,
  error: '',
  list: [
    {
      id: '',
      createdAt: '',
      modifiedAt: '',
      aceita_receber_comunicacoes: '',
      ano_evento: '',
      data_evento: '',
      nome: '',
      sobrenome: '',
      email: '',
      whatsapp: '',
      endereco_pais: '',
      endereco_estado: '',
      endereco_cidade: '',
      genero: '',
      data_nascimento: '',
      possui_veiculo_porsche: '',
      ja_possuiu_veiculo_porsche: ''
    }
  ],
}

export function inscricoes(state = initialState, action) {
  switch (action.type) {
    case inscricoesTypes.GET_INSCRICOES_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case inscricoesTypes.GET_INSCRICOES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        list: action.list
      };
    case inscricoesTypes.GET_INSCRICOES_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        list: [
          {
            id: '',
            createdAt: '',
            modifiedAt: '',
            aceita_receber_comunicacoes: '',
            ano_evento: '',
            data_evento: '',
            nome: '',
            sobrenome: '',
            email: '',
            whatsapp: '',
            endereco_pais: '',
            endereco_estado: '',
            endereco_cidade: '',
            genero: '',
            data_nascimento: '',
            possui_veiculo_porsche: '',
            ja_possuiu_veiculo_porsche: ''
          }
        ]
      };
    default:
      return state
  }
}