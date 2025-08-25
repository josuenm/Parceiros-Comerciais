import type { ReceitaWsDto, ViaCepDto } from "@/types/external.type";
import { api } from "./index.api";


export const ExternalAPI = {
    cep: async (cep: string): Promise<ViaCepDto> => await api.get(`v1/externo/cep/${cep}`),
    cnpj: async (cnpj: string): Promise<ReceitaWsDto> => await api.get(`v1/externo/cnpj/${cnpj}`),
}