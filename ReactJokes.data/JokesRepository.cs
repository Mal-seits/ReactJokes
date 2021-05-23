using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactJokes.data
{
    public class JokesRepository
    {
        private readonly string _connectionString;
        public JokesRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public Joke AddJoke(Joke joke)
        {
            using var context = new JokesDbContext(_connectionString);
            var jokeInContext = context.Jokes.FirstOrDefault(j => j.Setup == joke.Setup);
            if (jokeInContext == null)
            {
                context.Jokes.Add(joke);
                context.SaveChanges();
            }
            return context.Jokes.Include(j => j.UserLikedJokes).FirstOrDefault(j => j.Setup == joke.Setup);
        }
        public Joke LikeOrDislikeJoke(UserLikedJokes ulJoke)
        {
            using var context = new JokesDbContext(_connectionString);
            var userLiked = context.UserLikedJokes.FirstOrDefault(ulj => ulj.JokeId == ulJoke.JokeId && ulj.UserId == ulJoke.UserId);
            if (userLiked != null)
            {
                context.Database.ExecuteSqlInterpolated($"Update UserLikedJokes SET Liked = {ulJoke.Liked}, time = {ulJoke.Time} Where userId={ulJoke.UserId} and jokeId={ulJoke.JokeId}");
            }
            else
            {
                context.UserLikedJokes.Add(ulJoke);

            }
            context.SaveChanges();
            return GetJokeById(ulJoke.JokeId);
        }
        public Joke GetJokeById(int id)
        {
            using var context = new JokesDbContext(_connectionString);
            return context.Jokes.Include(j => j.UserLikedJokes).FirstOrDefault(j => j.Id == id);
        }
        public bool IsBeforeOneMinute(DateTime date)
        {
            DateTime currentDate = DateTime.Now;
            TimeSpan timeSpan = currentDate.Subtract(date);
            return timeSpan.TotalMinutes < 1;
        }
        public List<Joke> GetAllJokes()
        {
            using var context = new JokesDbContext(_connectionString);
            return context.Jokes.Include(j => j.UserLikedJokes).ToList();
        }

    }
}
