using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class UpdateCrawlSourceCategories : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Domain",
                table: "CrawlSources");

            migrationBuilder.AddColumn<string>(
                name: "DomainURL",
                table: "CrawlSources",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Logo",
                table: "CrawlSources",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "CrawlStepTypeRequiredAttribute",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    TypeName = table.Column<string>(nullable: true),
                    DefaultValue = table.Column<string>(nullable: true),
                    Required = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlStepTypeRequiredAttribute", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrawlStepTypeRequiredAttribute");

            migrationBuilder.DropColumn(
                name: "DomainURL",
                table: "CrawlSources");

            migrationBuilder.DropColumn(
                name: "Logo",
                table: "CrawlSources");

            migrationBuilder.AddColumn<string>(
                name: "Domain",
                table: "CrawlSources",
                type: "longtext CHARACTER SET utf8mb4",
                nullable: true);
        }
    }
}
