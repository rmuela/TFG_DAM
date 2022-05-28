namespace API.Interfaces;


public interface IJwtUtils
{
    public string GenerateToken(User user);
    public int? ValidateToken(string token);
}