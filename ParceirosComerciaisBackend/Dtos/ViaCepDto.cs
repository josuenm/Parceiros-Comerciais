using System.Text.Json.Serialization;

namespace ParceirosComerciais.Dtos
{
    public class ViaCepDto
    {
        [JsonPropertyName("cep")]
        public string Cep { get; set; } = string.Empty;

        [JsonPropertyName("logradouro")]
        public string Logradouro { get; set; } = string.Empty;

        [JsonPropertyName("bairro")]
        public string Bairro { get; set; } = string.Empty;

        [JsonPropertyName("localidade")]
        public string Localidade { get; set; } = string.Empty; // Cidade

        [JsonPropertyName("uf")]
        public string Uf { get; set; } = string.Empty; // Estado

        [JsonPropertyName("complemento")]
        public string Complemento { get; set; } = string.Empty;
    }
}
