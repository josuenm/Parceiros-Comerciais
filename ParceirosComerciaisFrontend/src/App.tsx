import { useEffect, useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Building, Info, Plus, RefreshCcw } from "lucide-react";
import { AppTable } from "./components/app-table";
import { Button } from "./components/ui/button";
import { Modal } from "./components/modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPartnerValidationSchema, type CreatePartnerSchema } from "./validations/partner.validation";
import { CreatePartnerForm } from "./components/forms/partner/create-partner.form";
import { Toaster } from "./components/ui/sonner";
import { PartnerAPI } from "./services/axios/partner.api";
import type { Partner } from "./types/partner.type";
import { useQueryState } from "./hooks/use-query-state.hook";
import VMasker from "vanilla-masker";
import { states } from "./utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export default function App() {
  const [search, setSearch] = useQueryState<string>("search", "");

  const [createPartnerModal, setCreatePartnerModal] = useState(false);
  const [addressModal, setAddressModal] = useState<string>("");

  const searchDebounce = useRef<NodeJS.Timeout>(null);

  const createPartnerForm = useForm<CreatePartnerSchema>({
    resolver: yupResolver(createPartnerValidationSchema)
  });

  const { data, isLoading, refetch, error } = useQuery<Partner[]>({
      queryKey: ["partners"],
      queryFn: () => PartnerAPI.list(search), 
      enabled: false
  });

  const selectedPartner = data?.find?.(item => item.id === addressModal);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (error?.message) {
      toast.error(error.message);
      console.log("Erro ao buscar lista de parceiros", error);
    }
  }, [error]);

  return (
    <main className="px-4 sm:px-0 max-w-3xl w-full mx-auto py-12 flex flex-col">
      <Toaster 
        position='top-right' 
        toastOptions={{
          classNames: {
            success: "!text-green-500",
            error: "!text-red-500",
            warning: "!text-orange-500",
            info: "!text-blue-500"
          }
        }}
      />

      <Modal 
        isOpen={!!addressModal} 
        onClose={() => setAddressModal("")} 
        className="flex flex-col"
      >
        <h2 className="text-2xl text-slate-600 font-semibold">Endereço</h2>

        <div className="flex flex-col gap-1 mt-4 flex-1">
          <p>
            <strong>Estado: </strong>
            <span>{states.find(item => item.uf === selectedPartner?.uf)?.name}</span>
          </p>
          <p>
            <strong>Cidade: </strong>
            <span>{selectedPartner?.municipio}</span>
          </p>
          <p>
            <strong>Bairro: </strong>
            <span>{selectedPartner?.bairro}</span>
          </p>
          <p>
            <strong>Logradouro: </strong>
            <span>{selectedPartner?.logradouro}</span>
          </p>
          <p>
            <strong>Número: </strong>
            <span>{selectedPartner?.numero}</span>
          </p>
          <p>
            <strong>Complemento: </strong>
            <span>{selectedPartner?.complemento || "Sem complemento"}</span>
          </p>
        </div>

        <Button 
          type="button" 
          variant="outline" 
          className="w-full mt-auto"
          onClick={() => setAddressModal("")} 
          >
            Fechar
        </Button>
      </Modal>
      <Modal 
        isOpen={createPartnerModal} 
        onClose={() => setCreatePartnerModal(false)} 
      >
        <CreatePartnerForm 
          form={createPartnerForm} 
          onSuccess={() => {
            setCreatePartnerModal(false);
            createPartnerForm.reset({});
            refetch();
          }}
        />
      </Modal>

      <Button className="ml-auto mb-4" onClick={() => setCreatePartnerModal(true)}>
        Adicionar parceiro
        <Plus />
      </Button>

      <Input 
        value={search} 
        onChange={e => {
          setSearch(e.target.value);

          if (searchDebounce.current) {
            clearTimeout(searchDebounce.current);
          }

          searchDebounce.current = setTimeout(() => {
            refetch();
          }, 800);
        }}
        placeholder="Busque por CPF, CNPJ, Nome Fantasia, Razão Social..." 
      />

      <Button 
        variant="secondary" 
        size="sm" 
        className="w-fit ml-auto flex justify-center items-center mt-8" 
        onClick={() => refetch()}
      >
        <span>Recarregar</span>
        <RefreshCcw />
      </Button>

      <div className="mt-4 pt-8 border-t border-slate-200">
        {!!data?.length && (
          <div className="bg-blue-500/10 text-blue-500 text-sm w-full flex items-center gap-3 p-4 rounded-xl mb-8">
            <Info />
            <span>Arraste para o lado para ver mais</span>
          </div>
        )}

        <AppTable<Partner> 
          columns={[
            {
              header: "CPF/CNPJ", 
              accessor: item => VMasker.toPattern(
                item.cnpjCpf, 
                item.cnpjCpf.length === 11 ? "999.999.999-99" : "99.999.999/9999-99"
              )
            }, 
            {
              header: "Razão Social", 
              accessor: "razaoSocial"
            }, 
            {
              header: "Nome fantasia", 
              accessor: "nomeFantasia"
            }, 
            {
              header: "Segmento", 
              accessor: "segmento"
            }, 
            {
              header: "Categoria", 
              accessor: "categoria"
            }, 
            {
              header: "E-mail", 
              accessor: "email"
            }, 
            {
              header: "Telefone", 
              accessor: item => VMasker.toPattern(item.telefone??"", "(99) 9999-9999")
            }, 
            {
              header: "Celular", 
              accessor: item => VMasker.toPattern(item.celular??"", "(99) 99999-9999")
            }, 
            {
              header: "Endereço", 
              align: "center", 
              accessor: item => (
                <Button variant="outline" size="sm" onClick={() => setAddressModal(item.id)}>
                  Mostrar
                </Button>
              )
            }, 
          ]}
          data={data || []} 
          loading={isLoading}
          containerClassName="sm:max-w-full"
          renderEmptyState={(
            <div className="flex flex-col items-center gap-4 text-center max-w-xs mx-auto">
              <div className="rounded-full bg-slate-100 w-16 h-16 sm:w-20 sm:h-20 flex justify-center items-center text-slate-500">
                <Building className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <p className="sm:text-xl text-slate-600">Nenhum parceiro comercial encontrado</p>
            </div>
          )}
        />
      </div>
    </main>
  )
}
