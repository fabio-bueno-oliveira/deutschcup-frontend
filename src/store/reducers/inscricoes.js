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
  inscricao: {
    id: '',
    createdAt: '',
    modifiedAt: '',
    nome: '',
    sobrenome: '',
    email: '',
    whatsapp: '',
    genero: '',
    data_nascimento: '',
    endereco_pais: '',
    endereco_estado: '',
    endereco_cidade: '',
    aceita_receber_comunicacoes: '',
    possui_veiculo_porsche: '',
    ja_possuiu_veiculo_porsche: '',
    ano_evento: '',
    data_evento: ''
  },
  inscritos: [
    {
      id: '',
      nome: '',
      sobrenome: '',
      apelido: '',
      tamanho_camiseta: '',
      email: '',
      whatsapp: '',
      endereco_pais: '',
      endereco_estado: '',
      endereco_cidade: '',
      genero: '',
      data_nascimento: ''
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
    case inscricoesTypes.GET_INSCRICAO_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case inscricoesTypes.GET_INSCRICAO_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        inscricao: action.info
      };
    case inscricoesTypes.GET_INSCRICAO_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        inscricao: {
          id: '',
          createdAt: '',
          modifiedAt: '',
          nome: '',
          sobrenome: '',
          email: '',
          whatsapp: '',
          genero: '',
          data_nascimento: '',
          endereco_pais: '',
          endereco_estado: '',
          endereco_cidade: '',
          aceita_receber_comunicacoes: '',
          possui_veiculo_porsche: '',
          ja_possuiu_veiculo_porsche: '',
          ano_evento: '',
          data_evento: ''
        }
      };
    case inscricoesTypes.GET_INSCRITOS_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case inscricoesTypes.GET_INSCRITOS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        inscritos: action.list
      };
    case inscricoesTypes.GET_INSCRITOS_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação',
        inscritos: [
          {
            id: '',
            nome: '',
            sobrenome: '',
            apelido: '',
            tamanho_camiseta: '',
            email: '',
            whatsapp: '',
            endereco_pais: '',
            endereco_estado: '',
            endereco_cidade: '',
            genero: '',
            data_nascimento: ''
          }
        ]
      };
    default:
      return state
  }
}