using System.ComponentModel.DataAnnotations;

namespace CozinhaApp.Web.Models
{
    public class AgendamentoItem
    {
        public int Id { get; set; }
        public int AgendamentoId { get; set; }
        
        [Required(ErrorMessage = "O produto é obrigatório")]
        public string Produto { get; set; }
        
        [Required(ErrorMessage = "A quantidade é obrigatória")]
        [Range(1, 100, ErrorMessage = "A quantidade deve estar entre 1 e 100")]
        public int Quantidade { get; set; }
        
        [Required(ErrorMessage = "O valor unitário é obrigatório")]
        [Range(0.01, 1000.00, ErrorMessage = "O valor deve estar entre 0,01 e 1000,00")]
        public decimal ValorUnitario { get; set; }

        public virtual Agendamento Agendamento { get; set; }
    }
} 