using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CozinhaApp.Api.Data;
using CozinhaApp.Api.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CozinhaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItensPedidoController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ItensPedidoController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemPedido>>> GetItensPedido()
        {
            return await _context.ItensPedido.Include(ip => ip.Produto).Include(ip => ip.Agendamento).ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemPedido>> GetItemPedido(int id)
        {
            var item = await _context.ItensPedido.Include(ip => ip.Produto).Include(ip => ip.Agendamento).FirstOrDefaultAsync(ip => ip.Id == id);
            if (item == null) return NotFound();
            return item;
        }

        [HttpPost]
        public async Task<ActionResult<ItemPedido>> PostItemPedido(ItemPedido itemPedido)
        {
            _context.ItensPedido.Add(itemPedido);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetItemPedido), new { id = itemPedido.Id }, itemPedido);
        }
    }
}
