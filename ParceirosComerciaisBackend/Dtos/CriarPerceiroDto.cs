using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using ParceirosComerciais.Models;

namespace ParceirosComerciais.Dtos
{
    public class CriarParceiroDto
    {
        [Required(ErrorMessage = "O tipo de parceiro é obrigatório")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public TipoParceiro TipoParceiro { get; set; }

        [Required(ErrorMessage = "A personalidade é obrigatória")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Personalidade Personalidade { get; set; }

        public string RazaoSocial { get; set; } = string.Empty;

        public string NomeFantasia { get; set; } = string.Empty;

        [Required(ErrorMessage = "O CNPJ ou CPF é obrigatório")]
        public string CnpjCpf { get; set; } = string.Empty;

        [Required(ErrorMessage = "O segmento é obrigatório")]
        public string Segmento { get; set; } = string.Empty;

        [Required(ErrorMessage = "A categoria é obrigatória")]
        public string Categoria { get; set; } = string.Empty;

        public string Cep { get; set; } = string.Empty;

        public string Pais { get; set; } = "BR";

        public string Uf { get; set; } = string.Empty;

        public string Municipio { get; set; } = string.Empty;

        public string Logradouro { get; set; } = string.Empty;

        public string Numero { get; set; } = string.Empty;

        public string Bairro { get; set; } = string.Empty;

        [Required(ErrorMessage = "O e-mail é obrigatório")]
        [EmailAddress(ErrorMessage = "E-mail inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "O telefone é obrigatório")]
        public string Telefone { get; set; } = string.Empty;

        public string Complemento { get; set; } = string.Empty;

        [Required(ErrorMessage = "O celular é obrigatório")]
        public string Celular { get; set; } = string.Empty;

        public string Observacao { get; set; } = string.Empty;
    }
}
