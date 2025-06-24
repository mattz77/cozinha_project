using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CozinhaApp.Api.Models
{
    public class Agendamento
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string UsuarioId { get; set; }

        [ForeignKey("UsuarioId")]
        public virtual Usuario Usuario { get; set; }

        [Required]
        [Display(Name = "Data e Hora do Agendamento")]
        public DateTime DataHoraAgendamento { get; set; }

        [Display(Name = "Data e Hora da Criação do Pedido")]
        public DateTime DataHoraCriacao { get; set; } = DateTime.UtcNow;

        [Required]
        [StringLength(50)]
        public string Status { get; set; } = "Pendente";

        [StringLength(500)]
        public string Observacoes { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal ValorTotal { get; set; }

        public virtual ICollection<ItemPedido> ItensPedido { get; set; } = new HashSet<ItemPedido>();
    }
}
