


using ParceirosComerciais.Dtos;

namespace ParceirosComerciais.Services
{

    public class ConsultaExternaService
    {
        private readonly HttpClient _http;

        public ConsultaExternaService(HttpClient http)
        {
            _http = http;
        }


        public async Task<ViaCepDto> GetCEP(string cep)
        {
            var url = $"https://viacep.com.br/ws/{cep}/json/";
            var result = await _http.GetFromJsonAsync<ViaCepDto>(url);
            
            if (result == null)
                throw new Exception("CEP não encontrado ou retorno inválido");

            return result;
        }

        public async Task<ReceitaWsDto> GetCNPJ(string cnpj)
        {
            var url = $"https://www.receitaws.com.br/v1/cnpj/{cnpj}";
            var result = await _http.GetFromJsonAsync<ReceitaWsDto>(url);

            if (result == null)
                throw new Exception("CNPJ não encontrado ou retorno inválido");

            return result;
        }

    }

}