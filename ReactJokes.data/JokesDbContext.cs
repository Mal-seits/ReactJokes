
using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace ReactJokes.data
{
    public class JokesDbContext : DbContext
    {
        private string _connectionString;

        public JokesDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            foreach (var relationship in modelBuilder.Model.GetEntityTypes().SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }

            modelBuilder.Entity<UserLikedJokes>()
                .HasKey(ul => new { ul.UserId, ul.JokeId });

            modelBuilder.Entity<UserLikedJokes>()
                .HasOne(ul => ul.User)
                .WithMany(u => u.UserLikedJokes)
                .HasForeignKey(u => u.UserId);

            modelBuilder.Entity<UserLikedJokes>()
               .HasOne(ul => ul.Joke)
               .WithMany(j => j.UserLikedJokes)
               .HasForeignKey(j => j.JokeId);


            base.OnModelCreating(modelBuilder);
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Joke> Jokes { get; set; }
        public DbSet<UserLikedJokes> UserLikedJokes { get; set; }


    }
}