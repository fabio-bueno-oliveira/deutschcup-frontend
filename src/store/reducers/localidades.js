import { localidadesTypes } from '../types/localidades';

const initialState = {
  requesting: false,
  success: false,
  error: '',
  paises: [
    {
      id: '',
      nome: '',
      codigo: '',
    }
  ],
  estados: [
    {
      id: '',
      nome: '',
      uf: '',
      codigo: '',
      country_id: '',
    }
  ],
  cidades: [
    {
      id: '',
      nome: '',
      region_id: '',
      country_id: '',
    }
  ],
}

export function localidades(state = initialState, action) {
  switch (action.type) {
    case localidadesTypes.GET_PAISES_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case localidadesTypes.GET_PAISES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        paises: action.list
      };
    case localidadesTypes.GET_PAISES_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação da lista de Países',
        paises: [
          {
            id: '',
            nome: '',
            codigo: '',
          }
        ]
      };
    case localidadesTypes.GET_ESTADOS_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case localidadesTypes.GET_ESTADOS_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        estados: action.list
      };
    case localidadesTypes.GET_ESTADOS_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação da lista de Estados',
        estados: [
          {
            id: '',
            nome: '',
            uf: '',
            codigo: '',
            country_id: '',
          }
        ]
      };
    case localidadesTypes.GET_CIDADES_REQUEST:
      return {
        ...state,
        requesting: true,
        success: false,
        error: ''
      };
    case localidadesTypes.GET_CIDADES_SUCCESS:
      return {
        ...state,
        requesting: false,
        success: true,
        error: '',
        cidades: action.list
      };
    case localidadesTypes.GET_CIDADES_FAILURE:
      return {
        ...state,
        requesting: false,
        success: false,
        error: 'Erro na solicitação da lista de Cidades',
        cidades: [
          {
            id: '',
            nome: '',
            region_id: '',
            country_id: '',
          }
        ]
      };
    default:
      return state
  }
}