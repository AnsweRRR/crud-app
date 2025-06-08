using Microsoft.EntityFrameworkCore;

namespace crud_api.DataAccess.ExceptionHandling
{
    public abstract class TranslatedDbUpdateException : DbUpdateException
    {
        public TranslatedDbUpdateException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    public class UniqueConstraintException : TranslatedDbUpdateException
    {
        public UniqueConstraintException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    public class CannotInsertNullException : TranslatedDbUpdateException
    {
        public CannotInsertNullException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    public class MaxLengthExceededException : TranslatedDbUpdateException
    {
        public MaxLengthExceededException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    public class NumericOverflowException : TranslatedDbUpdateException
    {
        public NumericOverflowException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }

    public class ReferenceConstraintException : TranslatedDbUpdateException
    {
        public ReferenceConstraintException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
