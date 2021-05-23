using Microsoft.EntityFrameworkCore.Migrations;

namespace ReactJokes.data.Migrations
{
    public partial class RemoveLikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "JokeId",
                table: "Jokes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "JokeId",
                table: "Jokes");
        }
    }
}
