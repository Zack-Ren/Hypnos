using CapstoneBackend.Models;
using CapstoneBackend.Services;

namespace CapstoneBackend
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("CapstoneDatabase"));
            builder.Services.Configure<Secrets>(builder.Configuration.GetSection("ConnectionString"));
            builder.Services.AddSingleton <ManagementService>();

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                builder.Configuration.AddUserSecrets<Program>();
            }

            app.UseCors();
            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
