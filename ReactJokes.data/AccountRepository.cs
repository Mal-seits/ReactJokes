using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ReactJokes.data
{
    public class AccountRepository
    {
        private readonly string _connectionString;
        public AccountRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void Signup(User user, string password)
        {
            using var context = new JokesDbContext(_connectionString);
            var passwordHashed = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = passwordHashed;
            context.Users.Add(user);
            context.SaveChanges();
        }
        public User GetUserByEmail(string email)
        {
            using var context = new JokesDbContext(_connectionString);
            return context.Users.FirstOrDefault(u => u.Email == email);
        }
        public User Login(string email, string password)
        {
            var user = GetUserByEmail(email);
            if(user == null)
            {
                return null;
            }
           bool isPasswordCorrect = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isPasswordCorrect)
            {
                return null;
            }
            return user;

        }
    }
}
