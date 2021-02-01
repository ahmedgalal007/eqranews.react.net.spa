using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class Add_Ctegories_Flags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsHome",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsMenu",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsSlider",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsTiker",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Periority",
                table: "Categories",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHome",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsMenu",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsSlider",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "IsTiker",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "Periority",
                table: "Categories");
        }
    }
}
