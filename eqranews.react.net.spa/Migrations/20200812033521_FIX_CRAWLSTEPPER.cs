using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class FIX_CRAWLSTEPPER : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrawlSteppers_CrawlSources_CrawlSourceId",
                table: "CrawlSteppers");

            migrationBuilder.DropColumn(
                name: "CrawlSourcId",
                table: "CrawlSteppers");

            migrationBuilder.AlterColumn<int>(
                name: "CrawlSourceId",
                table: "CrawlSteppers",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CrawlSteppers_CrawlSources_CrawlSourceId",
                table: "CrawlSteppers",
                column: "CrawlSourceId",
                principalTable: "CrawlSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CrawlSteppers_CrawlSources_CrawlSourceId",
                table: "CrawlSteppers");

            migrationBuilder.AlterColumn<int>(
                name: "CrawlSourceId",
                table: "CrawlSteppers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "CrawlSourcId",
                table: "CrawlSteppers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_CrawlSteppers_CrawlSources_CrawlSourceId",
                table: "CrawlSteppers",
                column: "CrawlSourceId",
                principalTable: "CrawlSources",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
