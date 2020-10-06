# example-azuread-react-auth
An example of how to use AzureAD for authentication in your react project

## Setup Client

```
cd client/src
yarn install
```

## Setup Server

```
cd server/src
npm install
```

## Configure Client

```
cd server/src/src
vi settings.js (Update BASE_URL, tenantId & clientId with your values)
```

## Configure Server for Development

```
cd server/src
mv .env.sample .env
vi .env (Update TENANT_ID, CLIENT_ID & FRONTEND_URL with your values)
```


## Start Development

```
cd servers/src
npm run dev
cd client/src
npm run start
```

## Navigating the demo

```
1. Start the client & server
2. Navigate to the client from your browser (Private/Incognito Mode is recommended)
3. Attempt to navigate to /Secure (This should redirect you to authenticate, then redirect yoy back to the homepage)
4. Navigate back to the client root
5. Click login (This should redirect you to authenticate, then redirect yoy back to the homepage)
6. Attempt to navigate to /Secure again (You should now be able to access the page)
```

## Roadmap

```
- Example for how to integrate with Azure AD Scopes
```