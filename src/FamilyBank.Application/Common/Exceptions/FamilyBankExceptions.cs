namespace FamilyBank.Application.Common.Exceptions;

public class FamilyBankException : Exception
{
    public string ErrorCode { get; }
    
    public FamilyBankException(string message, string errorCode = "GENERAL_ERROR") 
        : base(message)
    {
        ErrorCode = errorCode;
    }
}

public class ValidationException : FamilyBankException
{
    public ValidationException(string message) 
        : base(message, "VALIDATION_ERROR") { }
}

public class NotFoundException : FamilyBankException
{
    public NotFoundException(string message) 
        : base(message, "NOT_FOUND") { }
}

public class InsufficientBalanceException : FamilyBankException
{
    public InsufficientBalanceException() 
        : base("Số dư không đủ để thực hiện giao dịch", "INSUFFICIENT_BALANCE") { }
}

public class AccountFrozenException : FamilyBankException
{
    public AccountFrozenException() 
        : base("Tài khoản đã bị đóng băng", "ACCOUNT_FROZEN") { }
}

public class InvalidOtpException : FamilyBankException
{
    public InvalidOtpException() 
        : base("Mã OTP không hợp lệ hoặc đã hết hạn", "INVALID_OTP") { }
}

public class DuplicateTransactionException : FamilyBankException
{
    public string ReferenceNumber { get; }
    
    public DuplicateTransactionException(string referenceNumber) 
        : base("Giao dịch đã được xử lý trước đó", "DUPLICATE_TRANSACTION")
    {
        ReferenceNumber = referenceNumber;
    }
}
