using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CozinhaApp.Web.Data;
using CozinhaApp.Web.Models;
using CozinhaApp.Web.ViewModels;

namespace CozinhaApp.Web.Controllers
{
    public class AgendamentoController : Controller
    {
        private readonly AppDbContext _context;

        public AgendamentoController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([FromForm] AgendamentoViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View("Index", model);
            }

            var agendamento = new Agendamento
            {
                Nome = model.Nome,
                Email = model.Email,
                Telefone = model.Telefone,
                DataRetirada = model.Data,
                HoraRetirada = model.Hora,
                Observacoes = model.Observacoes,
                Status = StatusAgendamento.Pendente,
                DataCriacao = DateTime.Now,
                Itens = new List<AgendamentoItem>()
            };

            // Processar os itens selecionados
            if (model.Items != null)
            {
                foreach (var item in model.Items)
                {
                    var quantidade = GetQuantidade(model, item);
                    if (quantidade > 0)
                    {
                        var valorUnitario = GetValorUnitario(item);
                        agendamento.Itens.Add(new AgendamentoItem
                        {
                            Produto = item,
                            Quantidade = quantidade,
                            ValorUnitario = valorUnitario
                        });
                    }
                }
            }

            if (!agendamento.Itens.Any())
            {
                ModelState.AddModelError("", "Selecione pelo menos um item para o pedido");
                return View("Index", model);
            }

            try
            {
                _context.Agendamentos.Add(agendamento);
                await _context.SaveChangesAsync();

                // Enviar email de confirmação (implementar depois)
                TempData["Sucesso"] = "Pedido realizado com sucesso! Em breve você receberá um email de confirmação.";
                return RedirectToAction(nameof(Confirmacao), new { id = agendamento.Id });
            }
            catch (Exception ex)
            {
                // Log do erro
                ModelState.AddModelError("", $"Ocorreu um erro ao salvar o pedido: {ex.Message}");
                return View("Index", model);
            }
        }

        public async Task<IActionResult> Confirmacao(int id)
        {
            var agendamento = await _context.Agendamentos
                .Include(a => a.Itens)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (agendamento == null)
            {
                return NotFound();
            }

            return View(agendamento);
        }

        private int GetQuantidade(AgendamentoViewModel model, string item)
        {
            var quantidadeKey = $"qtd-{item}";
            if (Request.Form.ContainsKey(quantidadeKey))
            {
                return int.Parse(Request.Form[quantidadeKey]);
            }
            return 0;
        }

        private decimal GetValorUnitario(string produto)
        {
            // Valores fixos para cada produto
            return produto switch
            {
                "caldo-verde" => 28.90m,
                "caldo-feijao" => 26.90m,
                "canja" => 25.90m,
                "sopa-legumes" => 23.90m,
                "pao-caseiro" => 8.90m,
                "pao-queijo" => 12.90m,
                _ => 0m
            };
        }
    }
} 