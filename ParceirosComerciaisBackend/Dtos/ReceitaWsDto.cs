using System.Text.Json.Serialization;

namespace ParceirosComerciais.Dtos
{
    public class ReceitaWsDto
    {
        [JsonPropertyName("cnpj")]
        public string Cnpj { get; set; } = string.Empty;

        [JsonPropertyName("nome")]
        public string Nome { get; set; } = string.Empty; // Razão social

        [JsonPropertyName("fantasia")]
        public string Fantasia { get; set; } = string.Empty;

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; } = string.Empty; // MATRIZ / FILIAL

        [JsonPropertyName("situacao")]
        public string Situacao { get; set; } = string.Empty; // ATIVA / INATIVA

        [JsonPropertyName("abertura")]
        public string Abertura { get; set; } = string.Empty;

        [JsonPropertyName("logradouro")]
        public string Logradouro { get; set; } = string.Empty;

        [JsonPropertyName("numero")]
        public string Numero { get; set; } = string.Empty;

        [JsonPropertyName("bairro")]
        public string Bairro { get; set; } = string.Empty;

        [JsonPropertyName("municipio")]
        public string Municipio { get; set; } = string.Empty;

        [JsonPropertyName("uf")]
        public string Uf { get; set; } = string.Empty;

        [JsonPropertyName("cep")]
        public string Cep { get; set; } = string.Empty;

        [JsonPropertyName("email")]
        public string Email { get; set; } = string.Empty;

        [JsonPropertyName("telefone")]
        public string Telefone { get; set; } = string.Empty;

        [JsonPropertyName("natureza_juridica")]
        public string NaturezaJuridica { get; set; } = string.Empty;

        [JsonPropertyName("porte")]
        public string Porte { get; set; } = string.Empty;

        [JsonPropertyName("atividade_principal")]
        public AtividadePrincipalDto[] AtividadesPrincipais { get; set; } = Array.Empty<AtividadePrincipalDto>();
    }

    public class AtividadePrincipalDto
    {
        [JsonPropertyName("code")]
        public string Code { get; set; } = string.Empty;

        [JsonPropertyName("text")]
        public string Text { get; set; } = string.Empty;
    }
}
