using System;
using System.Collections.Generic;

namespace CozinhaApp.Web.Models
{
    public class Produto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Descricao { get; set; }
        public decimal Preco { get; set; }
        public string ImagemUrl { get; set; }
        public bool Disponivel { get; set; }
        public virtual ICollection<AgendamentoItem> AgendamentoItens { get; set; }
    }
} 