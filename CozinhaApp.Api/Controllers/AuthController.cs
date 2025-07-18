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
        private readonly JwtTokenHelper _jwtTokenHelper;
        public AuthController(ApplicationDbContext context, JwtTokenHelper jwtTokenHelper)
        {
            _context = context;
            _jwtTokenHelper = jwtTokenHelper;
        }

        // Cadastro tradicional
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == dto.Email))
                return BadRequest("E-mail já cadastrado.");

            var usuario = new Usuario
            {
                Id = Guid.NewGuid().ToString(),
                Nome = dto.Nome,
                Email = dto.Email,
                SenhaHash = BCrypt.Net.BCrypt.HashPassword(dto.Senha)
            };
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            var token = _jwtTokenHelper.GenerateToken(usuario.Id, usuario.Nome, usuario.Email);
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email, token });
        }

        // Login tradicional
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (usuario == null || string.IsNullOrEmpty(usuario.SenhaHash) || !BCrypt.Net.BCrypt.Verify(dto.Senha, usuario.SenhaHash))
                return Unauthorized("E-mail ou senha inválidos.");

            var token = _jwtTokenHelper.GenerateToken(usuario.Id, usuario.Nome, usuario.Email);
            return Ok(new { usuario.Id, usuario.Nome, usuario.Email, token });
        }

        [HttpGet("login-google")]
        public IActionResult LoginGoogle(string returnUrl = "/")
        {
            // Redireciona para o endpoint de callback do backend
            var redirectUrl = "/api/auth/google-callback";
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
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

            Console.WriteLine($"[GoogleCallback] Salvando usuário com ID: {id}");

            if (id == null || nome == null || email == null)
                return Unauthorized();

            Usuario usuario;
            try
            {
                usuario = await _context.Usuarios.FindAsync(id);
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
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[GoogleCallback] Erro ao salvar usuário: {ex.Message}");
                throw;
            }

            // Gera JWT e redireciona para o frontend com token
            var token = _jwtTokenHelper.GenerateToken(usuario.Id, usuario.Nome, usuario.Email);
            return Redirect($"http://localhost:3000/google-callback?token={token}&nome={Uri.EscapeDataString(usuario.Nome)}&email={Uri.EscapeDataString(usuario.Email)}");
        }
    }
}