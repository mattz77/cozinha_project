using System;
using System.ComponentModel.DataAnnotations;

namespace CozinhaApp.Web.ViewModels
{
    public class AgendamentoViewModel
    {
        [Required(ErrorMessage = "O nome é obrigatório")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O telefone é obrigatório")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O email é obrigatório")]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A data é obrigatória")]
        public DateTime Data { get; set; }

        [Required(ErrorMessage = "A hora é obrigatória")]
        public TimeSpan Hora { get; set; }

        public string[] Items { get; set; }

        public string Observacoes { get; set; }
    }
} 