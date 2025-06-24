using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CozinhaApp.Api.Models
{
    public class ItemPedido
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int AgendamentoId { get; set; }

        [ForeignKey("AgendamentoId")]
        public virtual Agendamento Agendamento { get; set; }

        [Required]
        public int ProdutoId { get; set; }

        [ForeignKey("ProdutoId")]
        public virtual Produto Produto { get; set; }

        [Required]
        [Range(1, 100)]
        public int Quantidade { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal PrecoUnitario { get; set; }
    }
}
