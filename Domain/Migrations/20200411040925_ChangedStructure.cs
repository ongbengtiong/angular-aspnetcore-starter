using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Domain.Migrations
{
    public partial class ChangedStructure : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "OrderBirthDate",
                table: "Order");

            migrationBuilder.AddColumn<string>(
                name: "ArtDating",
                table: "Product",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ArtDescription",
                table: "Product",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ArtistDeathDate",
                table: "Product",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ArtistNationality",
                table: "Product",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "OrderDate",
                table: "Order",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ArtDating",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ArtDescription",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ArtistDeathDate",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "ArtistNationality",
                table: "Product");

            migrationBuilder.DropColumn(
                name: "OrderDate",
                table: "Order");

            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Product",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OrderBirthDate",
                table: "Order",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
