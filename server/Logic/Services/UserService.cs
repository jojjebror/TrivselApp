﻿using Logic.Authentication;
using Logic.Database;
using Logic.Database.Entities;
using Logic.Models;
using Logic.Translators;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;

namespace Logic.Services
{
    public class UserService
    {

        private readonly AuthenticatedUser _authenticatedUser;
        private readonly DatabaseContext _context;

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
            var dbUser = await _context.Users.Include(u => u.Office)
                .FirstOrDefaultAsync(x => x.Id == id);

            var user = UserTranslator.ToModel(dbUser);

            return user;
        }

        public async Task<UserForUpdateDto> AddCredit(int id, int amount)
        {
                var dbUser = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == id);
            if (amount > 0)
            {
                dbUser.Credit = dbUser.Credit + amount;
                await _context.SaveChangesAsync();

            }
            if(amount < 0)
            {
                dbUser.Credit = dbUser.Credit + amount;
                await _context.SaveChangesAsync();
            }
            return UserTranslator.ToUserForUpdateDto(dbUser);
        }

        public async Task<UserForUpdateDto> UpdateOffice(int id, string newOffice)
        {
            var dbUser = await _context.Users.Include(u => u.Office)
                .FirstOrDefaultAsync(x => x.Id == id);

            var dbOffice = await _context.Offices.FirstOrDefaultAsync(x => x.Name == newOffice);
            
                dbUser.OfficeId = dbOffice.Id;
                await _context.SaveChangesAsync();
            
            return UserTranslator.ToUserForUpdateDto(dbUser);
        }

        public async Task<UserForUpdateDto> UpdateAdminStatus(int id, string status)
        {
            var dbUser = await _context.Users
                    .FirstOrDefaultAsync(x => x.Id == id);

            if(status == "true")
            {
                dbUser.Admin = true;
            }
            else
            {
                dbUser.Admin = false;
            }

            await _context.SaveChangesAsync();

            return UserTranslator.ToUserForUpdateDto(dbUser);
        }

        public async Task<int> DeleteUser(int id)
        {
            var dbUser = await _context.Users.Include(b => b.Events)
                                          .Include(b => b.EventParticipants)
                                          .FirstOrDefaultAsync(b => b.Id == id);

            _context.Users.Remove(dbUser);
            await _context.SaveChangesAsync();

            return id;
        }

        public async Task<UserForUpdateDto> RemoveCredit(int id, UserForUpdateDto user)
        {

            var dbUser = await _context.Users
                .FirstOrDefaultAsync(x => x.Id == id);

            dbUser.Credit = dbUser.Credit - user.Credit;

            await _context.SaveChangesAsync();

            return UserTranslator.ToUserForUpdateDto(dbUser);
        }

        public async Task<ICollection<UserDto>> GetCredit()
        {
            var fetch = await _context.Users.ToListAsync();

            return fetch.Select(UserTranslator.ToModel).ToList();
        }

        public async Task<ICollection<UserForListDto>> GetUsers()
        {
            var adm = "admin";
            var dbUsers = await _context.Users.Where(u => u.Name != adm).ToListAsync();

            return dbUsers.Select(UserTranslator.ToUserForListDto).ToList();
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
