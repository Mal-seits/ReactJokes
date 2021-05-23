using ReactJokes.data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactJokes.web.ViewModels
{
    public class SignupViewModel : User
    {
        public string Password { get; set; }
    }
}
