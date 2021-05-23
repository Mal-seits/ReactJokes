using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using ReactJokes.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ReactJokes.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JokesController : ControllerBase
    {
        private readonly string _connectionString;
        private IConfiguration _configuration;

        public JokesController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
            _configuration = configuration;
        }
        [HttpGet]
        [Route("GetAJoke")]
        public Joke GetAJoke()
        {
            var client = new HttpClient();
            string jokeJson = client.GetStringAsync("https://official-joke-api.appspot.com/jokes/programming/random").Result;
            var jokes = JsonConvert.DeserializeObject<List<Joke>>(jokeJson);
            var joke = jokes[0];
            joke.Id = 0;
            var repo = new JokesRepository(_connectionString);
            var jokeWithLikes = repo.AddJoke(joke);
            return jokeWithLikes;
        }
     
        

        [Authorize]
        [HttpPost]
        [Route("LikeOrDislikeAJoke")]
        public Joke LikeAJoke(UserLikedJokes ulJoke)
        {

            var repo = new JokesRepository(_connectionString);
            var user = GetCurrentUser();
            ulJoke.UserId = user.Id;
            ulJoke.Time = DateTime.Now;
            return repo.LikeOrDislikeJoke(ulJoke);

        }
        [HttpGet]
        [Route("GetJokeById")]
        public Joke GetJokeById(Joke joke)
        {
            var repo = new JokesRepository(_connectionString);
            return repo.GetJokeById(joke.Id);
        }
        [HttpGet]
        [Route("IsBeforeOneMinute")]
        public bool IsBeforeOneMinute(DateTime date)
        {
            var repo = new JokesRepository(_connectionString);
            return repo.IsBeforeOneMinute(date);
        }
        [HttpGet]
        [Route("GetAllJokes")]
        public List<Joke> GetAllJokes()
        {
            var repo = new JokesRepository(_connectionString);
            return repo.GetAllJokes();
        }
        private User GetCurrentUser()
        {
            string userId = User.FindFirst("user")?.Value;
            if (String.IsNullOrEmpty(userId))
            {
                return null;
            }
            var repo = new AccountRepository(_connectionString);
            return repo.GetUserByEmail(userId);
        }



    }

}
