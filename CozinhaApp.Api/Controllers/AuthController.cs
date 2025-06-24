using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using CozinhaApp.Api.Data;
using CozinhaApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace CozinhaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AuthController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("login-google")]
        public IActionResult LoginGoogle(string returnUrl = "/")
        {
            var properties = new AuthenticationProperties { RedirectUri = returnUrl };
            return Challenge(properties, GoogleDefaults.AuthenticationScheme);
        }

        [HttpGet("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }

        [HttpGet("google-callback")]
        public async Task<IActionResult> GoogleCallback()
        {
            var authenticateResult = await HttpContext.AuthenticateAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (!authenticateResult.Succeeded)
                return Unauthorized();

            var claims = authenticateResult.Principal.Identities.FirstOrDefault()?.Claims;
            var id = claims?.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;
            var nome = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            var email = claims?.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;
            var fotoUrl = claims?.FirstOrDefault(c => c.Type == "picture")?.Value;

            if (id == null || nome == null || email == null)
                return Unauthorized();

            // Salva ou atualiza o usuário no banco
            var usuario = await _context.Usuarios.FindAsync(id);
            if (usuario == null)
            {
                usuario = new Usuario { Id = id, Nome = nome, Email = email, FotoUrl = fotoUrl };
                _context.Usuarios.Add(usuario);
            }
            else
            {
                usuario.Nome = nome;
                usuario.Email = email;
                usuario.FotoUrl = fotoUrl;
                _context.Usuarios.Update(usuario);
            }
            await _context.SaveChangesAsync();

            // Redireciona para o frontend
            return Redirect("http://localhost:3000");
        }
    }
}
