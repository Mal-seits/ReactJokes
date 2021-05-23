using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace ReactJokes.data
{
    public class Joke
    {
        public int Id { get; set; }
        public string Setup { get; set; }
        public string Punchline { get; set; }
        public List<UserLikedJokes> UserLikedJokes { get; set; }
    }

}
