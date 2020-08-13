using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class FIX_STERPER_NAME : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LoopSelector",
                table: "CrawlSteps");

            migrationBuilder.DropColumn(
                name: "LoopsMax",
                table: "CrawlSteps");

            migrationBuilder.DropColumn(
                name: "LoopsPagerSelector",
                table: "CrawlSteps");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CrawlSteppers",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LoopSelector",
                table: "CrawlSteps",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LoopsMax",
                table: "CrawlSteps",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "LoopsPagerSelector",
                table: "CrawlSteps",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Name",
                table: "CrawlSteppers",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}
