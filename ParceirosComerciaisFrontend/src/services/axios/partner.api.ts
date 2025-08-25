import type { Partner } from "@/types/partner.type";
import { api } from "./index.api";
import type { CreatePartnerSchema } from "@/validations/partner.validation";


export const PartnerAPI = {
    list: async (search?: string): Promise<Partner[]> => await api.get("v1/parceiros", { params: { search } }),
    create: async (data: CreatePartnerSchema) => await api.post("v1/parceiros", data),
}