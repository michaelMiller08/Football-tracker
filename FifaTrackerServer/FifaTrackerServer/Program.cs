using FifaTrackerServer.Auth;
using FifaTrackerServer.Data;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddScheme<AuthenticationSchemeOptions, FireBaseAuthHandler>(JwtBearerDefaults.AuthenticationScheme, (o) => { });

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

System.Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", "./firebase-settings.json");

builder.Services.AddSingleton(FirebaseApp.Create());



var app = builder.Build();

app.UseCors(builder => builder.WithOrigins("https://localhost:3000")
                              .AllowAnyMethod()
                              .AllowAnyHeader()
                              .AllowAnyOrigin());
                              //.WithHeaders("authorization", "accept", "content-type", "origin"));


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();
