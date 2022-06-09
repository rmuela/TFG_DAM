using API.Authorization;
using API.Context;
using API.Helpers;
using API.Interfaces;
using API.Mapper;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Builder;

namespace API
{
    public class startup {

        
        public IConfiguration Configuration { get; }

        public startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddControllersWithViews();
            services.AddTransient<WeddingContext, WeddingContext>();
            services.AddCors();
            services.AddControllers();
            services.AddAutoMapper(typeof(Program));
            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            /*var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new AutoMapperProfile());
                mc.AddProfile(new InvitationProfile());
                mc.AddProfile(new InvitationProfile());

            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);     */

            services.AddSingleton<IJwtUtils, JwtUtils>();
            services.AddSingleton<IUserService, UserService>();
            services.AddSingleton<IInvitationService, InvitationService>();
            services.AddSingleton<IProvinceService, ProvinceService>();


           
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            /*if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }*/
            // app.UseCors(MyAllowSpecificOrigins);

            app.UseCors(x => x
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader());

            app.UseMiddleware<ErrorHandlerMiddleware>();

            // custom jwt auth middleware
            app.UseMiddleware<JwtMiddleware>();

            //app.MapControllers();

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            /*app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });*/

            
        }
    }
}

