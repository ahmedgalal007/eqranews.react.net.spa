using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class AddThumbfieldtoCrawlResult : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Thumb",
                table: "News",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Thumb",
                table: "News");
        }
    }
}
