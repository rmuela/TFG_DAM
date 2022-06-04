using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class AddInvitationEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Invitations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    weddingDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    placeConvite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    adressConvite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    city = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hourDinnerConvite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    transportConvite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    hourTransportConvite = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    boyPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    girlPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    pinCode = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invitations", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invitations");
        }
    }
}
