using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class updateModelInvitation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "city",
                table: "Invitations");

            migrationBuilder.AddColumn<int>(
                name: "cityIdProvince",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "coupleName",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "idCity",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "idUsuario",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "usuarioId",
                table: "Invitations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_cityIdProvince",
                table: "Invitations",
                column: "cityIdProvince");

            migrationBuilder.CreateIndex(
                name: "IX_Invitations_usuarioId",
                table: "Invitations",
                column: "usuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_provinces_cityIdProvince",
                table: "Invitations",
                column: "cityIdProvince",
                principalTable: "provinces",
                principalColumn: "IdProvince",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invitations_Users_usuarioId",
                table: "Invitations",
                column: "usuarioId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_provinces_cityIdProvince",
                table: "Invitations");

            migrationBuilder.DropForeignKey(
                name: "FK_Invitations_Users_usuarioId",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_cityIdProvince",
                table: "Invitations");

            migrationBuilder.DropIndex(
                name: "IX_Invitations_usuarioId",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "cityIdProvince",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "coupleName",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "idCity",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "idUsuario",
                table: "Invitations");

            migrationBuilder.DropColumn(
                name: "usuarioId",
                table: "Invitations");

            migrationBuilder.AddColumn<string>(
                name: "city",
                table: "Invitations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
