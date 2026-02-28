using FamilyBank.Application.Interfaces;
using FamilyBank.Domain.Interfaces;
using FamilyBank.Infrastructure.Data;
using FamilyBank.Infrastructure.Repositories;
using FamilyBank.Infrastructure.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FamilyBank.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        // Database
        services.AddDbContext<FamilyBankDbContext>(options =>
            options.UseNpgsql(
                configuration.GetConnectionString("DefaultConnection"),
                npgsqlOptions => npgsqlOptions.MigrationsAssembly(typeof(FamilyBankDbContext).Assembly.FullName)
            ));

        // Repositories & UnitOfWork
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IAccountRepository, AccountRepository>();
        services.AddScoped<ITransactionRepository, TransactionRepository>();
        services.AddScoped<IOtpRepository, OtpRepository>();

        // Services
        services.AddScoped<ISmsService, MockSmsService>();

        return services;
    }
}
