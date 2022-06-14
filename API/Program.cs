using Microsoft.EntityFrameworkCore;
using API.Authorization;
using API.Helpers;
using API.Services;
using API.Interfaces;
using API.Context;
using AutoMapper;
using API.Mapper;
var builder = WebApplication.CreateBuilder(args);


{
    var services = builder.Services;
    var env = builder.Environment;
    



    services.AddTransient<WeddingContext, WeddingContext>();
    services.AddCors();
    services.AddControllers();

    // configure automapper with all automapper profiles from this assembly
    services.AddAutoMapper(typeof(Program));
    /*var mapperConfig = new  MapperConfiguration(mc =>

        {
            mc.AddProfile(new AutoMapperProfile());
            mc.AddProfile(new InvitationProfile());

        });
    IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);*/
    // configure strongly typed settings object
    services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
    

    // configure DI for application services
    services.AddScoped<IJwtUtils, JwtUtils>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IInvitationService, InvitationService>();
    services.AddScoped<IProvinceService, ProvinceService>();
}

var app = builder.Build();

/*
// migrate any database changes on startup (includes initial db creation)
using (var scope = app.Services.CreateScope())
{
    var dataContext = scope.ServiceProvider.GetRequiredService<DataContext>();    
    dataContext.Database.Migrate();
}*/

// configure HTTP request pipeline
{
    // global cors policy
    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // global error handler
    app.UseMiddleware<ErrorHandlerMiddleware>();

    // custom jwt auth middleware
    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();
}

app.Run("http://localhost:4000");
