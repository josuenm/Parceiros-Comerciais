import type { Personalidade, TipoParceiro } from "@/types/partner.type";

export const states = [
  { name: "Acre", uf: "AC" },
  { name: "Alagoas", uf: "AL" },
  { name: "Amapá", uf: "AP" },
  { name: "Amazonas", uf: "AM" },
  { name: "Bahia", uf: "BA" },
  { name: "Ceará", uf: "CE" },
  { name: "Distrito Federal", uf: "DF" },
  { name: "Espírito Santo", uf: "ES" },
  { name: "Goiás", uf: "GO" },
  { name: "Maranhão", uf: "MA" },
  { name: "Mato Grosso", uf: "MT" },
  { name: "Mato Grosso do Sul", uf: "MS" },
  { name: "Minas Gerais", uf: "MG" },
  { name: "Pará", uf: "PA" },
  { name: "Paraíba", uf: "PB" },
  { name: "Paraná", uf: "PR" },
  { name: "Pernambuco", uf: "PE" },
  { name: "Piauí", uf: "PI" },
  { name: "Rio de Janeiro", uf: "RJ" },
  { name: "Rio Grande do Norte", uf: "RN" },
  { name: "Rio Grande do Sul", uf: "RS" },
  { name: "Rondônia", uf: "RO" },
  { name: "Roraima", uf: "RR" },
  { name: "Santa Catarina", uf: "SC" },
  { name: "São Paulo", uf: "SP" },
  { name: "Sergipe", uf: "SE" },
  { name: "Tocantins", uf: "TO" }
];

export const ufs = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA",
  "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN",
  "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const partnerTypes: TipoParceiro[] = ["AGENTE_LOGISTICA", "CLIENTE", "DESPACHANTE", "FORNECEDOR"];

export const personalityLabel = (key: Personalidade) => {
  switch(key) {
    case "JURIDICA":
      return "Jurídica";

    case "FISICA":
      return "Física";

    default:
      return key;
  }
}

export const partnerLabel = (key: TipoParceiro) => {
  switch(key) {
    case "AGENTE_LOGISTICA":
      return "Agente Logística";

    case "CLIENTE":
      return "Cliente";

    case "DESPACHANTE":
      return "Despachante";

    case "FORNECEDOR":
      return "Fornecedor";

    default:
      return key;
  }
}