using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CozinhaApp.Api.Models
{
    public class Usuario
    {
        [Key]
        public string Id { get; set; } // Subject ID do Google

        [Required]
        [StringLength(100)]
        public string Nome { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string FotoUrl { get; set; }

        public virtual ICollection<Agendamento> Agendamentos { get; set; } = new HashSet<Agendamento>();
    }
}
