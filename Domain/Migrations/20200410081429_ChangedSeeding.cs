using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Domain.Migrations
{
    public partial class ChangedSeeding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Artist", "ArtistBirthDate", "ImageUrl" },
                values: new object[] { "Artist01", new DateTime(2020, 4, 10, 8, 14, 28, 926, DateTimeKind.Utc).AddTicks(505), "https://example.com/sample.png" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Product",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Artist", "ArtistBirthDate", "ImageUrl" },
                values: new object[] { "https://example.com/sample.png", new DateTime(2020, 4, 10, 8, 12, 36, 833, DateTimeKind.Utc).AddTicks(6970), null });
        }
    }
}
