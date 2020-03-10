using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Security.Claims;

namespace Logic.Authentication
{
    public class AuthenticatedUser
    {

        public int? Id { get; set; }

        public void FromClaims(IEnumerable<Claim> claims)
        {
            Id = ExtractIdFromClaims(claims, "sub");
        }

        private static int? ExtractIdFromClaims(IEnumerable<Claim> claims, string type)
        {
            var idStr = claims.FirstOrDefault(x => x.Type == type)?.Value;

            if (idStr == null)
                return null;

            return int.Parse(idStr);
        }

    }
}
