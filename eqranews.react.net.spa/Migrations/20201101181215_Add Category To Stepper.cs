using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class AddCategoryToStepper : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "CrawlSteppers",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "CrawlSteppers",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Default",
                table: "Categories",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_CrawlSteppers_CategoryId",
                table: "CrawlSteppers",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CrawlSteppers_Categories_CategoryId",
                table: "CrawlSteppers",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrawlSteppers_Categories_CategoryId",
                table: "CrawlSteppers");

            migrationBuilder.DropIndex(
                name: "IX_CrawlSteppers_CategoryId",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "Default",
                table: "Categories");
        }
    }
}
