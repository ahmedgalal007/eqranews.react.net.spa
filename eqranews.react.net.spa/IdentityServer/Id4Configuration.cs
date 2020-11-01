using IdentityModel;
using IdentityServer4.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using System.Collections.Generic;
using System.Security.Claims;

namespace eqranews.react.net.spa.IdentityServer
{
    public static class Id4Configuration
    {
        public static IEnumerable<ApiResource> GetApis() =>
            new List<ApiResource>()
            {
                new ApiResource("MVCClient") ,
            };



        public static IEnumerable<Client> GetClients() =>
            new List<Client>
            {
                new Client{
                    ClientId = "client_id",
                    ClientSecrets = { new Secret("client_secret".ToSha256())},
                    AllowedGrantTypes =  GrantTypes.ClientCredentials,
                    AllowedScopes = { "MVCClient" }
                }
            };

        /// <summary>
        /// /////////////////////////////////////////
        /// </summary>
        /// <returns></returns>
        /// 

        public static void AddIdentityResources(IdentityResourceCollection resources)
        {
            //resources.Clear();
            var customProfile = new IdentityResource(
                 name: "custom.profile",
                 displayName: "Custom profile",
                 claimTypes: new[] { ClaimTypes.GivenName, ClaimTypes.Surname });

            // resources.AddOpenId();
            // resources.AddEmail();
            // resources.AddProfile();
            resources.Add(customProfile);

        }
        public static void AddApis(ApiResourceCollection Apis)
        {
            Apis.AddRange(
                new ApiResource("MVCClient")
            );
        }

        public static void AddClients(ClientCollection clients)
        {
            clients.AddRange(
                 new Client
                 {
                     ClientId = "client_id",
                     ClientSecrets = { new Secret("client_secret".ToSha256()) },
                     AllowedGrantTypes = GrantTypes.CodeAndClientCredentials,
                     AlwaysIncludeUserClaimsInIdToken = true,
                     // where to redirect to after login
                     RedirectUris = { "https://localhost:44369/signin-oidc" },
                     RequireConsent = false,
                     // where to redirect to after logout
                     PostLogoutRedirectUris = { "https://localhost:44369/signout-callback-oidc" },
                     AllowedScopes = new List<string>
                     {
                         "openid",
                         "profile",
                         "custom.profile",
                         "role",
                     }

                 });
        }
    }
}
