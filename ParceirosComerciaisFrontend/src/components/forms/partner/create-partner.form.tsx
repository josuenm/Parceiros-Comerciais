import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";
import { ExternalAPI } from "@/services/axios/external.api";
import { PartnerAPI } from "@/services/axios/partner.api";
import { partnerLabel, states } from "@/utils/helpers";
import type { CreatePartnerSchema } from "@/validations/partner.validation";
import { useEffect, useRef, useState } from "react";
import { Controller, type UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import VMasker from "vanilla-masker";


interface Props {
    form: UseFormReturn<CreatePartnerSchema>;
    onSuccess?: () => void;
}

export function CreatePartnerForm({ form, onSuccess }: Props) {
    const [loading, setLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);
    const [cnpjLoading, setCnpjLoading] = useState(false);

    const cnpjDebounce = useRef<NodeJS.Timeout>(null);
    const cepDebounce = useRef<NodeJS.Timeout>(null);

    const error = form.formState.errors;

    const searchCep = async (cep: string) => {
        setCepLoading(true);
        try {
            const res = await ExternalAPI.cep(cep);
            if (res) {
                form.setValue("uf", res.uf);
                form.setValue("municipio", res.localidade);
                form.setValue("bairro", res.bairro);
                form.setValue("logradouro", res.logradouro);
            }
        } catch(e) {
            const error = e as Error;
            toast.error(error.message);
            console.error("Erro ao buscar cep", e);
        } finally {
            setCepLoading(false);
        }
    }

    const searchCnpj = async (cnpj: string) => {
        setCnpjLoading(true);
        try {
            const res = await ExternalAPI.cnpj(cnpj);
            if (res) {
                form.setValue("razaoSocial", res.nome);
                form.setValue("nomeFantasia", res.fantasia);
                form.setValue("email", res.email);
                form.setValue("cep", res.cep);
                form.setValue("uf", res.uf);
                form.setValue("municipio", res.municipio);
                form.setValue("bairro", res.bairro);
                form.setValue("logradouro", res.logradouro);
                form.setValue("numero", res.numero);

                if (VMasker.toNumber(res.telefone).length === 11) {
                    form.setValue("celular", res.telefone);
                } else {
                    form.setValue("telefone", res.telefone);
                }
            }
        } catch(e) {
            const error = e as Error;
            toast.error(error.message);
            console.error("Erro ao buscar cnpj", e);
        } finally {
            setCnpjLoading(false);
        }
    }

    const submit = async (data: CreatePartnerSchema) => {
        setLoading(true);
        try {
            await PartnerAPI.create(data);
            onSuccess?.();
        } catch(e) {
            const error = e as Error;
            toast.error(error.message);
            console.error("Erro ao tentar adicionar parceiro", e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        form.setValue("pais", "BR");
    }, []);

    return (
        <form onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
            <h2 className="text-2xl text-slate-600 font-semibold">Adicionar parceiro</h2>

            <Controller 
                control={form.control} 
                name="tipoParceiro" 
                render={({ field: { value, onChange } }) => (
                    <Select onValueChange={onChange}>
                        <div className="col-span-2 w-full">
                            <Label aria-required className="mb-1">Tipo de Parceiro</Label>
                            <SelectTrigger className="w-full" error={error.tipoParceiro?.message}>
                                {partnerLabel(value) ?? "Tipo de parceiro"}
                            </SelectTrigger>
                        </div>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="AGENTE_LOGISTICA">Agente Logística</SelectItem>
                                <SelectItem value="CLIENTE">Cliente</SelectItem>
                                <SelectItem value="DESPACHANTE">Despachante</SelectItem>
                                <SelectItem value="FORNECEDOR">Fornecedor</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            <Controller 
                control={form.control} 
                name="cnpjCpf" 
                disabled={cnpjLoading}
                render={({ field: { value, onChange } }) => (
                    <Input 
                        label="CPF ou CNPJ" 
                        placeholder="Digite seu CPF ou CNPJ" 
                        containerClassName="col-span-2" 
                        info="Para CNPJ vamos preencher seus dados automáticamente" 
                        name="cnpjCpf"
                        value={(value??"").length <= 11 
                            ? VMasker.toPattern(value??"", "999.999.999-99") 
                            : VMasker.toPattern(value??"", "99.999.999/9999-99")} 
                        onChange={e => {
                            const raw = e.target.value;
                            const cnpj = VMasker.toNumber(raw);

                            if (cnpj.length === 11) {
                                form.setValue("personalidade", "FISICA");
                            } else if (cnpj.length === 14) {
                                form.setValue("personalidade", "JURIDICA");

                                if (cnpjDebounce.current) {
                                    clearTimeout(cnpjDebounce.current);
                                }

                                cnpjDebounce.current = setTimeout(() => {
                                    searchCnpj(cnpj);
                                }, 800);
                            }

                            onChange(cnpj);
                        }} 
                        error={error.cnpjCpf?.message}
                        required
                    />
                )}
            />

            <Input 
                label="Razão Social"
                placeholder="Digite sua razão social" 
                error={error.razaoSocial?.message} 
                disabled={cnpjLoading} 
                {...form.register("razaoSocial")}
                name="razaoSocial" 
            />
            <Input 
                label="Nome Fantasia"
                placeholder="Digite seu nome fantasia" 
                error={error.nomeFantasia?.message} 
                disabled={cnpjLoading} 
                {...form.register("nomeFantasia")} 
                name="nomeFantasia" 
            />
            <Input 
                label="Segmento"
                placeholder="Digite seu segmento" 
                error={error.segmento?.message} 
                disabled={cnpjLoading}
                required 
                {...form.register("segmento")} 
                name="segmento" 
            />
            <Input 
                label="Categoria"
                placeholder="Digite sua categoria" 
                error={error.categoria?.message} 
                disabled={cnpjLoading}
                required 
                {...form.register("categoria")} 
                name="categoria" 
            />
            <Controller 
                control={form.control}
                name="cep"
                render={({ field: { value, onChange } }) => (
                    <Input 
                        label="CEP"
                        placeholder="00000-000" 
                        info="Vamos preencher seu endereço automáticamente" 
                        value={VMasker.toPattern(value??"", "99999-999")} 
                        onChange={e => {
                            const cep = VMasker.toNumber(e.target.value);
                            onChange(cep);

                            if (cepDebounce.current) {
                                clearTimeout(cepDebounce.current);
                            }

                            cepDebounce.current = setTimeout(() => {
                                searchCep(cep);
                            }, 800);
                        }} 
                        error={error.cep?.message} 
                        name="cep" 
                        required 
                    />
                )}
            />
            <Select disabled>
                <div className="col-span-2 w-full">
                    <Label aria-required className="mb-1">País</Label>
                    <SelectTrigger className="w-full">Brasil</SelectTrigger>
                </div>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="BR">Brasil</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            <Controller 
                control={form.control}
                name="uf"
                render={({ field: { value, onChange } }) => (
                    <Select onValueChange={onChange} disabled={cnpjLoading || cepLoading}>
                        <div className="col-span-2 w-full">
                            <Label aria-required className="mb-1">Estado</Label>
                            <SelectTrigger className="w-full" error={error.uf?.message}>
                                {states.find(item => item.uf === value)?.name ?? "Estado"}
                            </SelectTrigger>
                        </div>
                        <SelectContent>
                            <SelectGroup>
                                {states.map(item => (
                                    <SelectItem key={item.uf} value={item.uf}>{item.name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )}
            />
            <Input 
                label="Cidade"
                placeholder="Digite sua cidade" 
                error={error.municipio?.message}
                required 
                disabled={cnpjLoading || cepLoading} 
                {...form.register("municipio")}
                name="cidade" 
            />
            <Input 
                label="Bairro"
                placeholder="Digite seu bairro" 
                error={error.bairro?.message}
                required 
                disabled={cnpjLoading || cepLoading}
                {...form.register("bairro")} 
                name="bairro" 
            />
            <Input 
                label="Logradouro"
                placeholder="Digite seu logradouro" 
                error={error.logradouro?.message}
                required 
                disabled={cnpjLoading || cepLoading}
                {...form.register("logradouro")} 
                name="logradouro" 
            />
            <Input 
                label="Número"
                placeholder="Ex: 920 Fundos" 
                error={error.numero?.message} 
                disabled={cnpjLoading}
                required 
                name="numero" 
            />
            <Input 
                label="Complemento"
                placeholder="Ex: Fundos" 
                error={error.complemento?.message} 
                {...form.register("complemento")} 
                name="complemento" 
            />
            <Input 
                label="E-mail"
                placeholder="Ex: exemplo@exemplo.com" 
                error={error.email?.message}
                required 
                disabled={cnpjLoading}
                {...form.register("email")} 
                name="email" 
            />
            <Controller 
                control={form.control} 
                name="telefone" 
                render={({ field: { value, onChange } }) => (
                    <Input 
                        label="Telefone"
                        placeholder="(xx) xxxxx-xxxx" 
                        value={VMasker.toPattern(value??"", "(99) 9999-9999")} 
                        onChange={e => onChange(VMasker.toNumber(e.target.value))} 
                        error={error.telefone?.message} 
                        disabled={cnpjLoading}
                        required 
                        name="telefone" 
                    />
                )}
            />
            <Controller 
                control={form.control} 
                name="celular" 
                render={({ field: { value, onChange } }) => (
                    <Input 
                        label="Celular"
                        placeholder="(xx) xxxxx-xxxx" 
                        value={VMasker.toPattern(value??"", "(99) 99999-9999")} 
                        onChange={e => onChange(VMasker.toNumber(e.target.value))} 
                        error={error.celular?.message} 
                        disabled={cnpjLoading}
                        required 
                        name="celular" 
                    />
                )}
            />
            <Input 
                label="Observação"
                placeholder="Empresa focada em X" 
                error={error.observacao?.message} 
                {...form.register("observacao")} 
                name="observacao" 
            />

            <Button className="mt-4 w-fit ml-auto px-8" loading={loading}>
                Adicionar parceiro
            </Button>
        </form>
    )
}