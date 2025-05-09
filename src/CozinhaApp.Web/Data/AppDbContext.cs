using Microsoft.EntityFrameworkCore;
using CozinhaApp.Web.Models;

namespace CozinhaApp.Web.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Agendamento> Agendamentos { get; set; }
        public DbSet<AgendamentoItem> AgendamentoItens { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração do Agendamento
            modelBuilder.Entity<Agendamento>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Email).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Telefone).IsRequired().HasMaxLength(20);
                entity.Property(e => e.DataRetirada).IsRequired();
                entity.Property(e => e.HoraRetirada).IsRequired();
                entity.Property(e => e.Observacoes).HasMaxLength(500);
                entity.Property(e => e.Status).IsRequired();
                entity.Property(e => e.DataCriacao).IsRequired();
            });

            // Configuração do AgendamentoItem
            modelBuilder.Entity<AgendamentoItem>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Produto).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Quantidade).IsRequired();
                entity.Property(e => e.ValorUnitario).IsRequired().HasPrecision(10, 2);

                entity.HasOne(d => d.Agendamento)
                    .WithMany(p => p.Itens)
                    .HasForeignKey(d => d.AgendamentoId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
} 