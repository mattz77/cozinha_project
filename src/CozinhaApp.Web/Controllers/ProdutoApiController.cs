using Microsoft.AspNetCore.Mvc;
using CozinhaApp.Web.Data;
using CozinhaApp.Web.Models;
using System.Linq;

namespace CozinhaApp.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProdutoApiController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProdutoApiController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProdutos()
        {
            var produtos = _context.Produtos
                .Where(p => p.Disponivel)
                .Select(p => new {
                    p.Id,
                    p.Nome,
                    p.Descricao,
                    p.Preco,
                    p.ImagemUrl
                })
                .ToList();
            return Ok(produtos);
        }
    }
} 