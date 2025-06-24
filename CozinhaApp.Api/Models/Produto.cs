using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CozinhaApp.Api.Models
{
    public class Produto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [StringLength(500)]
        public string Descricao { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Preco { get; set; }

        [StringLength(2048)]
        public string UrlImagem { get; set; }

        [StringLength(50)]
        public string Categoria { get; set; }

        public virtual ICollection<ItemPedido> ItensPedido { get; set; } = new HashSet<ItemPedido>();
    }
}
