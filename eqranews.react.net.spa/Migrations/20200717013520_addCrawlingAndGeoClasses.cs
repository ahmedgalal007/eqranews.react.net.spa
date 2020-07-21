using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace eqranews.react.net.spa.Migrations
{
    public partial class addCrawlingAndGeoClasses : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AspNetUserTokens",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128) CHARACTER SET utf8mb4",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserTokens",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128) CHARACTER SET utf8mb4",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "ProviderKey",
                table: "AspNetUserLogins",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128) CHARACTER SET utf8mb4",
                oldMaxLength: 128);

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserLogins",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(128) CHARACTER SET utf8mb4",
                oldMaxLength: 128);

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    IsoCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CrawlSetpTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlSetpTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CrawlSources",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Domain = table.Column<string>(nullable: true),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlSources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlSources_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CrawlSteppers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<int>(nullable: false),
                    CrawlSourcId = table.Column<int>(nullable: false),
                    CrawlSourceId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlSteppers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlSteppers_CrawlSources_CrawlSourceId",
                        column: x => x.CrawlSourceId,
                        principalTable: "CrawlSources",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "CrawlSteps",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Url = table.Column<string>(nullable: true),
                    CrawlStepTypeId = table.Column<int>(nullable: false),
                    Selector = table.Column<string>(nullable: true),
                    LoopSelector = table.Column<string>(nullable: true),
                    LoopsPagerSelector = table.Column<string>(nullable: true),
                    LoopsMax = table.Column<int>(nullable: false),
                    CrawlStepperId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlSteps", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlSteps_CrawlSetpTypes_CrawlStepTypeId",
                        column: x => x.CrawlStepTypeId,
                        principalTable: "CrawlSetpTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CrawlSteps_CrawlSteppers_CrawlStepperId",
                        column: x => x.CrawlStepperId,
                        principalTable: "CrawlSteppers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CrawlItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Selector = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    Attr = table.Column<string>(nullable: true),
                    CrawlStepId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CrawlItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CrawlItems_CrawlSteps_CrawlStepId",
                        column: x => x.CrawlStepId,
                        principalTable: "CrawlSteps",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CrawlItems_CrawlStepId",
                table: "CrawlItems",
                column: "CrawlStepId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlSources_CountryId",
                table: "CrawlSources",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlSteppers_CrawlSourceId",
                table: "CrawlSteppers",
                column: "CrawlSourceId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlSteps_CrawlStepTypeId",
                table: "CrawlSteps",
                column: "CrawlStepTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_CrawlSteps_CrawlStepperId",
                table: "CrawlSteps",
                column: "CrawlStepperId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CrawlItems");

            migrationBuilder.DropTable(
                name: "CrawlSteps");

            migrationBuilder.DropTable(
                name: "CrawlSetpTypes");

            migrationBuilder.DropTable(
                name: "CrawlSteppers");

            migrationBuilder.DropTable(
                name: "CrawlSources");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "AspNetUserTokens",
                type: "varchar(128) CHARACTER SET utf8mb4",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserTokens",
                type: "varchar(128) CHARACTER SET utf8mb4",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "ProviderKey",
                table: "AspNetUserLogins",
                type: "varchar(128) CHARACTER SET utf8mb4",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "LoginProvider",
                table: "AspNetUserLogins",
                type: "varchar(128) CHARACTER SET utf8mb4",
                maxLength: 128,
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
