using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CozinhaApp.Web.Models
{
    public class Agendamento
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A data é obrigatória")]
        public DateTime DataRetirada { get; set; }

        [Required(ErrorMessage = "A hora é obrigatória")]
        public TimeSpan HoraRetirada { get; set; }

        public string Observacoes { get; set; }

        public DateTime DataCriacao { get; set; } = DateTime.Now;

        public StatusAgendamento Status { get; set; } = StatusAgendamento.Pendente;

        public virtual ICollection<AgendamentoItem> Itens { get; set; }

        public decimal ValorTotal 
        { 
            get 
            {
                decimal total = 0;
                if (Itens != null)
                {
                    foreach (var item in Itens)
                    {
                        total += item.Quantidade * item.ValorUnitario;
                    }
                }
                return total;
            }
        }
    }

    public enum StatusAgendamento
    {
        Pendente,
        Confirmado,
        Concluido,
        Cancelado
    }
} 