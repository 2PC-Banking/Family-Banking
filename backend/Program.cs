using Microsoft.EntityFrameworkCore;
using backend.Data;
using backend.models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddMemoryCache();

// 1. SERVICES
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddHttpClient("BankB"); // HttpClient để Coordinator gọi Bank B

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (string.IsNullOrWhiteSpace(connectionString))
{
    var dbHost = builder.Configuration["DB_HOST"] ?? "localhost";
    var dbPort = builder.Configuration["DB_PORT"] ?? "5432";
    var dbName = builder.Configuration["DB_NAME"] ?? "2PC";
    var dbUser = builder.Configuration["DB_USER"] ?? "postgres";
    var dbPassword = builder.Configuration["DB_PASSWORD"] ?? "postgres";

    connectionString =
        $"Host={dbHost};Port={dbPort};Database={dbName};Username={dbUser};Password={dbPassword}";
}

builder.Configuration["BankB:BaseUrl"] =
    builder.Configuration["BANKB_BASE_URL"] ?? builder.Configuration["BankB:BaseUrl"];
builder.Configuration["BankB:MockMode"] =
    builder.Configuration["BANKB_MOCK_MODE"] ?? builder.Configuration["BankB:MockMode"];

builder.Services.AddDbContext<BankDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => {
        policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// 2. MIDDLEWARE
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();   // Hết lỗi CS1061
    app.UseSwaggerUI(); // Hết lỗi CS1061
}

// app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();
// --- Đoạn code kiểm tra kết nối Database ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<BankDbContext>();
        // Hàm CanConnect() sẽ trả về true nếu chuỗi kết nối đúng và DB đang chạy
        if (context.Database.CanConnect())
        {
            Console.WriteLine("✅ KẾT NỐI POSTGRESQL THÀNH CÔNG!");
        }
        else
        {
            Console.WriteLine("❌ KHÔNG THỂ KẾT NỐI POSTGRESQL.");
        }
    }
    catch (Exception ex)
    {
        Console.WriteLine($"❌ LỖI KẾT NỐI DB: {ex.Message}");
    }
}
// -------------------------------------------

app.Run();
