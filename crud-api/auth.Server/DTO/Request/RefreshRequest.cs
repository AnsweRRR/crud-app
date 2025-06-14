namespace auth.Server.DTO.Request
{
    public class RefreshRequest
    {
        public string Token { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
    }
}
