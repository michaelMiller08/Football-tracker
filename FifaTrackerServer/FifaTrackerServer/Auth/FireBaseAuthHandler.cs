using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Npgsql.EntityFrameworkCore.PostgreSQL.Storage.Internal.Mapping;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace FifaTrackerServer.Auth
{
    public class FireBaseAuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private FirebaseApp _firebaseApp;

        public FireBaseAuthHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, FirebaseApp firebaseApp) : base(options, logger, encoder, clock)
        {
            _firebaseApp = firebaseApp;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Context.Request.Headers.ContainsKey("Authorization"))
            {
                return AuthenticateResult.NoResult();
            }

            string bearerToken = Context.Request.Headers["Authorization"];
            if (bearerToken == null || !bearerToken.StartsWith("Bearer"))
            {
                return AuthenticateResult.Fail("Invalid token");
            }


            try
            {
                var token = await FirebaseAuth.GetAuth(_firebaseApp).VerifyIdTokenAsync(bearerToken.Substring("Bearer ".Length));

                return AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(new List<ClaimsIdentity>()
            {
                new ClaimsIdentity(ToClaims(token.Claims), nameof(FireBaseAuthHandler))
            }), JwtBearerDefaults.AuthenticationScheme));
            }
            catch (Exception ex)
            {

                return AuthenticateResult.Fail(ex);
            }
        }

        private IEnumerable<Claim> ToClaims(IReadOnlyDictionary<string, object> claims)
        {
            return new List<Claim>
            {

            };
        }
    }
}
