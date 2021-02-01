using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class AddCrawlStepperSwitches : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "InHome",
                table: "CrawlSteppers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InMenu",
                table: "CrawlSteppers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InMoreMenu",
                table: "CrawlSteppers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InSlider",
                table: "CrawlSteppers",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "InTicker",
                table: "CrawlSteppers",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "InHome",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "InMenu",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "InMoreMenu",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "InSlider",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "InTicker",
                table: "CrawlSteppers");
        }
    }
}
