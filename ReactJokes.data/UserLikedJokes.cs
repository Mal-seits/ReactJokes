using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace ReactJokes.data
{
    public class UserLikedJokes
    {
        public int UserId { get; set; }

        [JsonIgnore]
        public User User { get; set; }
        public int JokeId { get; set; }
        [JsonIgnore]
        public Joke Joke { get; set; }
        public DateTime Time { get; set; }
        public bool Liked { get; set; }
    }

}
