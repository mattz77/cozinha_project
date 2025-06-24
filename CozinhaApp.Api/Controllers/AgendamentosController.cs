using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CozinhaApp.Api.Data;
using CozinhaApp.Api.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CozinhaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgendamentosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AgendamentosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agendamento>>> GetAgendamentos()
        {
            return await _context.Agendamentos
                .Include(a => a.ItensPedido)
                .ThenInclude(ip => ip.Produto)
                .Include(a => a.Usuario)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Agendamento>> GetAgendamento(int id)
        {
            var agendamento = await _context.Agendamentos
                .Include(a => a.ItensPedido)
                .ThenInclude(ip => ip.Produto)
                .Include(a => a.Usuario)
                .FirstOrDefaultAsync(a => a.Id == id);
            if (agendamento == null) return NotFound();
            return agendamento;
        }

        [HttpPost]
        public async Task<ActionResult<Agendamento>> PostAgendamento(Agendamento agendamento)
        {
            _context.Agendamentos.Add(agendamento);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAgendamento), new { id = agendamento.Id }, agendamento);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAgendamento(int id, Agendamento agendamento)
        {
            if (id != agendamento.Id) return BadRequest();
            _context.Entry(agendamento).State = EntityState.Modified;
            foreach (var item in agendamento.ItensPedido)
            {
                if (item.Id == 0)
                    _context.Entry(item).State = EntityState.Added;
                else
                    _context.Entry(item).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAgendamento(int id)
        {
            var agendamento = await _context.Agendamentos.Include(a => a.ItensPedido).FirstOrDefaultAsync(a => a.Id == id);
            if (agendamento == null) return NotFound();
            _context.ItensPedido.RemoveRange(agendamento.ItensPedido);
            _context.Agendamentos.Remove(agendamento);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
