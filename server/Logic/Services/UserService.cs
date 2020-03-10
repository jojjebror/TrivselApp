using Logic.Authentication;
using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class UserService
    {

        private AuthenticatedUser _authenticatedUser;
        private DatabaseContext _context;

        private readonly PasswordHasher _passwordHasher = new PasswordHasher();

        public UserService(AuthenticatedUser authenticatedUser, DatabaseContext context)
        {
            _context = context;
            _authenticatedUser = authenticatedUser;
        }

        /// <summary>
        /// Gets the currently authenticated user
        /// </summary>
        /// <returns></returns>
        public async Task<UserDto> GetAuthenticated()
        {
            return await Get(_authenticatedUser.Id.Value);
        }

        /// <summary>
        /// Get single user
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<UserDto> Get(int id)
        {
            var dbUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id);

            var user = UserTranslator.ToModel(dbUser);

            return user;
        }

        public async Task<UserDto> Login(string email, string password)
        {
            var dbUser = await _context.Users.FirstOrDefaultAsync(x => x.Email == email);

            if (dbUser == null)
                return null;

            if (_passwordHasher.VerifyHashedPassword(dbUser.Password, password) == PasswordVerificationResult.Failed)
                return null;

            return await Get(dbUser.Id);
        }

        public async Task<UserDto> Create(UserDto user, string password)
        {
            var dbUser = new User
            {
                Email = user.Email,
                Name = user.Name,
                Password = _passwordHasher.HashPassword(password)
            };
            _context.Users.Add(dbUser);

            await _context.SaveChangesAsync();

            return UserTranslator.ToModel(dbUser);
        }

        public async Task<UserDto> FindByGoogleId(string googleId)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.GoogleId == googleId);
            return UserTranslator.ToModel(user);
        }

        public async Task<UserDto> CreateFromGoogle(string googleId, UserDto user)
        {
            var dbUser = new User
            {
                GoogleId = googleId,
                Email = user.Email,
                Name = user.Name
            };

            _context.Users.Add(dbUser);

            await _context.SaveChangesAsync();

            return UserTranslator.ToModel(dbUser);
        }

    }
}
