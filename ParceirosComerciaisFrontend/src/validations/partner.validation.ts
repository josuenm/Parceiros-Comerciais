import type { TipoParceiro } from "@/types/partner.type";
import { partnerTypes, ufs } from "@/utils/helpers";
import * as yup from "yup";


function validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let sum = 0;
    for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== Number(cpf[9])) return false;
  
    sum = 0;
    for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== Number(cpf[10])) return false;
  
    return true;
}
  
function validateCNPJ(cnpj: string): boolean {
    cnpj = cnpj.replace(/\D/g, "");
    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    let digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
  
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(0))) return false;
  
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
      sum += Number(numbers.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== Number(digits.charAt(1))) return false;
  
    return true;
}


export const createPartnerValidationSchema = yup
  .object({
    tipoParceiro: yup
      .string()
      .oneOf(partnerTypes as TipoParceiro[])
      .required("O tipo de parceiro é obrigatório"),

    personalidade: yup
      .string()
      .required("A personalidade é obrigatória"),

    razaoSocial: yup
      .string()
      .default(""),

      nomeFantasia: yup.string().default(""),

      cnpjCpf: yup
        .string()
        .required("O CNPJ ou CPF é obrigatório")
        .test("cpf-cnpj-valid", "Documento inválido", (value, ctx) => {
          if (!value) return false;
          const onlyDigits = value.replace(/\D/g, "");
  
          if (onlyDigits.length === 11) {
            return validateCPF(onlyDigits) || ctx.createError({ message: "CPF inválido" });
          }
          if (onlyDigits.length === 14) {
            return validateCNPJ(onlyDigits) || ctx.createError({ message: "CNPJ inválido" });
          }
  
          return ctx.createError({ message: "CPF ou CNPJ inválido" });
        }),
  
      segmento: yup.string().required("O segmento é obrigatório"),
      categoria: yup.string().required("A categoria é obrigatória"),
      cep: yup.string().default(""),
      pais: yup.string().oneOf(["BR"]).default("BR"),
      uf: yup.string().oneOf(ufs).default(""),
      municipio: yup.string().default(""),
      logradouro: yup.string().default(""),
      numero: yup.string().default(""),
      bairro: yup.string().default(""),
  
      email: yup
        .string()
        .email("E-mail inválido")
        .required("O e-mail é obrigatório"),
  
      telefone: yup.string().required("O telefone é obrigatório"),
      complemento: yup.string().default(""),
      celular: yup.string().required("O celular é obrigatório"),
      observacao: yup.string().default(""),
  })
  .required();

export type CreatePartnerSchema = yup.InferType<typeof createPartnerValidationSchema>;
