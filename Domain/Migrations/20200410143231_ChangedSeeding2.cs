using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Domain.Migrations
{
    public partial class ChangedSeeding2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Product",
                columns: new[] { "Id", "ArtId", "Artist", "ArtistBirthDate", "Category", "ImageUrl", "Price", "Size", "Title" },
                values: new object[] { 1, null, "Artist01", new DateTime(2020, 4, 10, 8, 14, 28, 926, DateTimeKind.Utc).AddTicks(505), null, "https://example.com/sample.png", 0m, null, "OG Title of the URL" });
        }
    }
}
