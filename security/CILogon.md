# Explaining CILogon
OIDC (OpenID Connect) allows users to log in through third-party identity providers (like Google), but most major providers require you to register and sometimes pay. CILogon is a free identity platform designed for researchers, universities, and federally recognized institutions. What makes CILogon special is that it supports over 5,000 identity providers, including: Google, Microsoft, ORCHID, and university logins. This allows users to log in with either common accounts (e.g. Google) or their institutional credentials. However, to use CILogon, your app must be affiliated with an approved institution (like a university or research org). Whilst CILogon is free, there are other limitations such

## Scopes and Claims
When you authenticate with CILogon, you typically request the openid scope.Minimal claims guaranteed under openid:
- sub: Unique user ID across the provider
- iss: The issuer (CILogon)
- Optional scopes:
  - email: May provide user’s email (if available)
  - org.cilogon.userinfo: Adds CILogon-specific claims:
    - idp: Identity provider’s unique ID (e.g., Google, IU)
    - idp_name: Human-readable name of the provider

These optional claims may not always be present, so always handle missing fields gracefully.

## Demonstrating CILogon's OIDC Process

### 1. Register Client and Set up environment 
Let's assume you've already registered as an OIDC client on CILogon. Now let's setup the environment to start testing with curl. First set the environment variables that the server know that you're a valid OIDC client (authorization).
```bash
export CILOGON_CLIENT_ID=cilogon:/client_id/<my-client-id>
export CILOGON_CLIENT_SECRET=<my-client-secret>
export CILOGON_REDIRECT_URI=https://localhost/callback
```

### 2. User Redirect
Redirect the user to authorization server (CILogon) with scopes:
```bash
https://cilogon.org/authorize?
response_type=code&
client_id=cilogon:/client_id/<my-client-id>&
redirect_uri=https://localhost/callback&scope=openid+profile+email+org.cilogon.userinfo
```

### 3. Authorization Code Exchange
CILogon hits our `redirect_uri` endpoint and gives us an authorization code. We'll exchange the authorization code for an access token. 
```bash
# HTTP Request
https://cilogon.org/oauth2/token?
  grant_type=authorization_code&
  code=<authorization_code>&
  client_id=<my-client_id>&
  client_secret=<my-client_secret>&
  redirect_uri=<redirect_uri>
```
This gives us a JWT token (access token). The refresh token is only returned if refresh tokens are enabled for your client. That's done when you register your client, or you can just ask CILogon to enable them for your client.
```json
{
  "access_token": <access_token>,
  "refresh_token": <refresh_token>,
  "token_type": "Bearer",
  "expires_in": 900
}
```

### 4. Exchange Access Token for User Info
```bash
# Endpoint you're hitting to get the authenticated user's info
https://cilogon.org/oauth2/userinfo

# Request body of your request
{
  access_token: <access_token>
}
```
Finally use that access token to get authenticated user's information. The JSON output of that request is shown below. It's very idealized as this assumes that all fields are returned to us.
```json
{
  "subject_id": "tfleury@ncsa.illinois.edu",
  "sub": "http://cilogon.org/serverD/users/35110",
  "idp_name": "National Center for Supercomputing Applications",
  "eppn": "tfleury@ncsa.illinois.edu",
  "cert_subject_dn": "/DC=org/DC=cilogon/C=US/O=National Center for Supercomputing Applications/CN=Terrence Fleury D35110",
  "eptid": "https://idp.ncsa.illinois.edu/idp/shibboleth!https://dev.cilogon.org/shibboleth!85ENhMSxWWw+m0L8Wx9LDiH+jDE=",
  "iss": "https://dev.cilogon.org",
  "given_name": "Terrence",
  "acr": "https://refeds.org/profile/mfa",
  "aud": "cilogon:/client_id/6e8fdae3459dac6c685c6b6de37c188c",
  "idp": "https://idp.ncsa.illinois.edu/idp/shibboleth",
  "token_id": "https://cilogon.org/oauth2/idToken/4c10db2c8dc2e02d0795e6c3a340763d/1637353708383",
  "affiliation": "member@ncsa.illinois.edu;employee@ncsa.illinois.edu;staff@ncsa.illinois.edu",
  "name": "Terrence Fleury",
  "family_name": "Fleury",
  "email": "tfleury@illinois.edu"
}
```

### Optional: Using Refresh Tokens
```bash
# Hit CILogon's oauth2.0 endpoint for tokens
https://cilogon.org/oauth2/token

# Request body:
{
  client_id,
  client_secret,
  refresh_token
  # The scopes you used in the original OIDC request to get that access and refresh token.
  scope=scope=openid+profile+email+org.cilogon.userinfo
}
```

## Credits
- [CILogon OIDC Documentation](https://www.cilogon.org/oidc)