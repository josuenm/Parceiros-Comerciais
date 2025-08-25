using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParceirosComerciais.Models
{
    public enum TipoParceiro
    {
        AGENTE_LOGISTICA,
        CLIENTE, 
        DESPACHANTE, 
        FORNECEDOR
    }

    public enum Personalidade
    {
        FISICA,
        JURIDICA
    }

    public class Parceiro
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Required]
        public TipoParceiro TipoParceiro { get; set; }

        [Required]
        public Personalidade Personalidade { get; set; }

        [Required]
        [MaxLength(255)]
        public string RazaoSocial { get; set; } = string.Empty;

        [MaxLength(255)]
        public string NomeFantasia { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string CnpjCpf { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Segmento { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Categoria { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Cep { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Pais { get; set; } = "BR";

        [MaxLength(100)]
        public string Uf { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Municipio { get; set; } = string.Empty;

        [MaxLength(255)]
        public string Logradouro { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Numero { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Bairro { get; set; } = string.Empty;

        [EmailAddress]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Telefone { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Complemento { get; set; } = string.Empty;

        [MaxLength(20)]
        public string Celular { get; set; } = string.Empty;

        public string Observacao { get; set; } = string.Empty;
    }
}
