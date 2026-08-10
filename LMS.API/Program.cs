using LMS.Application.Interfaces;
using LMS.Application.Services;
using LMS.Infrastructure.Data;
using LMS.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

//////////////////////////////////////////////////////
// DB
//////////////////////////////////////////////////////
builder.Services.AddDbContext<AppDbContext>(x =>
    x.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

//////////////////////////////////////////////////////
// DI
//////////////////////////////////////////////////////
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ICourseRepository, CourseRepository>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<JwtService>();

//////////////////////////////////////////////////////
// Controllers
//////////////////////////////////////////////////////
builder.Services.AddControllers();

//////////////////////////////////////////////////////
// CORS (React)
//////////////////////////////////////////////////////
builder.Services.AddCors(x =>
{
    x.AddPolicy("react", p =>
    {
        p.AllowAnyHeader()
         .AllowAnyMethod()
         .AllowAnyOrigin();
    });
});

//////////////////////////////////////////////////////
// Swagger 🔥
//////////////////////////////////////////////////////
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "LMS API",
        Version = "v1"
    });

    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Bearer TOKEN"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

//////////////////////////////////////////////////////
// JWT
//////////////////////////////////////////////////////
var key = Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!);

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(o =>
{
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true
    };
});

builder.Services.AddAuthorization();

//////////////////////////////////////////////////////
// BUILD
//////////////////////////////////////////////////////
var app = builder.Build();

//////////////////////////////////////////////////////
// Middleware order 🔥
//////////////////////////////////////////////////////

app.UseSwagger();
app.UseSwaggerUI();

app.UseCors("react");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
