namespace auth.Server.DTO.Response
{
    public class AuthResponse
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
