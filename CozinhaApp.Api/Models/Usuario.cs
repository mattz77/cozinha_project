using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CozinhaApp.Api.Models
{
    public class Usuario
    {
        [Key]
        public string Id { get; set; } = string.Empty; // Subject ID do Google

        [Required]
        [StringLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public string FotoUrl { get; set; } = string.Empty;

        // Campo para login tradicional
        public string SenhaHash { get; set; } = string.Empty;

        public virtual ICollection<Agendamento> Agendamentos { get; set; } = new HashSet<Agendamento>();
    }
}
