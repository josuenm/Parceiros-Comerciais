
export interface AtividadePrincipalDto {
    code: string;
    text: string;
  }
  
export interface ReceitaWsDto {
    cnpj: string;
    nome: string; // Razão social
    fantasia: string;
    tipo: string;
    situacao: string;
    abertura: string;
    logradouro: string;
    numero: string;
    bairro: string;
    municipio: string;
    uf: string;
    cep: string;
    email: string;
    telefone: string;
    natureza_juridica: string;
    porte: string;
    atividade_principal: AtividadePrincipalDto[];
}
  

export interface ViaCepDto {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string; // Cidade
  uf: string;
  complemento: string;
}
  