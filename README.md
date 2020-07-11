# DevConnector

DevConnector is a full social network app where developers can create and link their profile with their Github to share their projects and ideas.  Users can see other people's public profiles and also post in a public forum.  

It uses React, Redux, Express, MongoDB, and JWT for user authentication and protected routes.  

## Screenshots

Home Page:

Use Profile:

Forum:

## Starting the app locally

#### Add a default.json file in config folder with the following
```
{
  "mongoURI": "<your_mongoDB_Atlas_uri_with_credentials>",
  "jwtSecret": "secret",
  "githubToken": "<yoursecrectaccesstoken>"
}
```

Clone the directory and change into the root directory. Run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm run dev
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any API requests from the client.

#### App Info
Based off of Brad Traversy's [Udemy Course](https://www.udemy.com/course/mern-stack-front-to-back/)
