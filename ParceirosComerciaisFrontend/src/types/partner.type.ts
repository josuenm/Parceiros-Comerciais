
export type TipoParceiro = "AGENTE_LOGISTICA" | "CLIENTE" | "DESPACHANTE" | "FORNECEDOR";

export type Personalidade = "FISICA" | "JURIDICA";

export interface Partner {
    id: string;
    tipoParceiro: TipoParceiro;
    personalidade: Personalidade;
    razaoSocial: string;
    nomeFantasia?: string;
    cnpjCpf: string;
    segmento?: string;
    categoria?: string;
    cep?: string;
    pais: string;
    uf?: string;
    municipio?: string;
    logradouro?: string;
    numero?: string;
    bairro?: string;
    email?: string;
    telefone?: string;
    complemento?: string;
    celular?: string;
    observacao?: string;
}