// <auto-generated />
using System;
using API.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(WeddingContext))]
    [Migration("20220613225756_updateColumnCoupleName")]
    partial class updateColumnCoupleName
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("API.Entities.Invitation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("adressConvite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("boyPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("cityIdProvince")
                        .HasColumnType("int");

                    b.Property<string>("coupleName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("girlPhone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hourDinnerConvite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("hourTransportConvite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("idCity")
                        .HasColumnType("int");

                    b.Property<int>("idUsuario")
                        .HasColumnType("int");

                    b.Property<string>("pinCode")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("placeConvite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("transportConvite")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.Property<DateTime>("weddingDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("cityIdProvince");

                    b.HasIndex("usuarioId");

                    b.ToTable("Invitations");
                });

            modelBuilder.Entity("API.Entities.Province", b =>
                {
                    b.Property<int>("IdProvince")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdProvince"), 1L, 1);

                    b.Property<string>("ProvinceName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdProvince");

                    b.ToTable("provinces");
                });

            modelBuilder.Entity("API.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.Invitation", b =>
                {
                    b.HasOne("API.Entities.Province", "city")
                        .WithMany()
                        .HasForeignKey("cityIdProvince")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.User", "usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("city");

                    b.Navigation("usuario");
                });
#pragma warning restore 612, 618
        }
    }
}
