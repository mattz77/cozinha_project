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
    public class ProdutosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ProdutosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produto>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> GetProduto(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null) return NotFound();
            return produto;
        }

        [HttpPost]
        public async Task<ActionResult<Produto>> PostProduto(Produto produto)
        {
            _context.Produtos.Add(produto);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProduto), new { id = produto.Id }, produto);
        }
    }
}
