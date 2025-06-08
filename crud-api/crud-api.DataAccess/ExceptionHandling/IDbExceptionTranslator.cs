namespace crud_api.DataAccess.ExceptionHandling
{
    public interface IDbExceptionTranslator
    {
        Exception Translate(Exception originalException);
    }
}
