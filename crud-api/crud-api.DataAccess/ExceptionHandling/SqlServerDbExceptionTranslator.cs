using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using crud_api.Resource.Localization;

namespace crud_api.DataAccess.ExceptionHandling
{
    public class SqlServerDbExceptionTranslator : IDbExceptionTranslator
    {
        /*
         Ez alapján készült, ez alapján bővíthető további adatbázisokhoz is:
        https://github.com/Giorgi/EntityFramework.Exceptions
         */
        private const int ReferenceConstraint = 547;
        private const int CannotInsertNull = 515;
        private const int CannotInsertDuplicateKeyUniqueIndex = 2601;
        private const int CannotInsertDuplicateKeyUniqueConstraint = 2627;
        private const int ArithmeticOverflow = 8115;
        private const int StringOrBinaryDataWouldBeTruncated = 8152;

        public Exception Translate(Exception originalException)
        {
            if (originalException is DbUpdateException dbEx)
            {
                if (dbEx.InnerException is SqlException sqlEx)
                {
                    switch (sqlEx.Number)
                    {
                        case ReferenceConstraint:
                            return new ReferenceConstraintException(Localization.ReferenceConstraintViolationErrorMessage, originalException);
                        case CannotInsertNull:
                            return new CannotInsertNullException(Localization.CannotInsertNullErrorMessage, originalException);
                        case CannotInsertDuplicateKeyUniqueIndex:
                        case CannotInsertDuplicateKeyUniqueConstraint:
                            return new UniqueConstraintException(Localization.UniqueConstraintViolationErrorMessage, originalException);
                        case ArithmeticOverflow:
                            return new NumericOverflowException(Localization.NumericOverflowErrorMessage, originalException);
                        case StringOrBinaryDataWouldBeTruncated:
                            return new MaxLengthExceededException(Localization.MaxLengthExceededErrorMessage, originalException);
                        default:
                            return null;
                    }
                }
            }

            return originalException;
        }
    }
}
