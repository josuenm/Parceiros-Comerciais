using Microsoft.EntityFrameworkCore;
using ParceirosComerciais.Database;
using ParceirosComerciais.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<ParceiroService>();
builder.Services.AddScoped<ConsultaExternaService>();
builder.Services.AddHttpClient<ConsultaExternaService>();
builder.Services.AddControllers();
builder.Services.AddCors(options => 
{
    options.AddPolicy("AllowFrontend", policy => 
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
    );
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.UseCors("AllowFrontend");
app.MapControllers();
app.Run();