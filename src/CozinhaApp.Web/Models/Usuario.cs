using System;
using System.Collections.Generic;

namespace CozinhaApp.Web.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string GoogleId { get; set; }
        public DateTime DataCadastro { get; set; }
        public virtual ICollection<Agendamento> Agendamentos { get; set; }
    }
} 