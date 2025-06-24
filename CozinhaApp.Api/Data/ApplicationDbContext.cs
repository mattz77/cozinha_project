using Microsoft.EntityFrameworkCore;
using CozinhaApp.Api.Models;

namespace CozinhaApp.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<ItemPedido> ItensPedido { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configurações adicionais se necessário
            modelBuilder.Entity<Produto>()
                .Property(p => p.Preco)
                .HasColumnType("decimal(18,2)");
            modelBuilder.Entity<ItemPedido>()
                .Property(ip => ip.PrecoUnitario)
                .HasColumnType("decimal(18,2)");
            modelBuilder.Entity<Agendamento>()
                .Property(a => a.ValorTotal)
                .HasColumnType("decimal(18,2)");
        }
    }
}
