import express from "express";
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import routes from "../shared/routes";
import configureStore from "../shared/configureStore";
import App from "../shared/App";
import "source-map-support/register";

const app = express();

app.use(cors());
app.use(express.static("public"));

app.get("/api/news", (req, res) => {
  res.json([
    {
      id: 1,
      upvotes: 247,
      title: "Fianto Duri, the complete tutorial",
      author: "RubeusH",
      date: new Date(Date.now() - 15000000)
    },
    {
      id: 2,
      upvotes: 221,
      title: "Untransfiguration classes to become compulsory at Hogwarts",
      author: "Baddock",
      date: new Date(Date.now() - 45000000)
    },
    {
      id: 3,
      upvotes: 198,
      title: "Cracking the Aurologist Interview ",
      author: "Hetty",
      date: new Date(Date.now() - 900000)
    },
    {
      id: 4,
      upvotes: 171,
      title: "ASK WN: What do you use to digitalize your scrolls?",
      author: "Alphard",
      date: new Date(Date.now() - 40000000)
    },
    {
      id: 5,
      upvotes: 166,
      title: "The Pragmatic Dragon Feeder",
      author: "Baruffio",
      date: new Date(Date.now() - 10000000)
    },
    {
      id: 6,
      upvotes: 145,
      title: "The complete quidditch statistics",
      author: "Hbeery",
      date: new Date(Date.now() - 5000000)
    },
    {
      id: 7,
      upvotes: 126,
      title: "Ordinary Wizarding Levels study guide",
      author: "BathBabb",
      date: new Date(Date.now() - 600000)
    },
    {
      id: 8,
      upvotes: 114,
      title: "Is muggle-baiting ever acceptable?",
      author: "Falco",
      date: new Date(Date.now() - 60000000)
    },
    {
      id: 9,
      upvotes: 74,
      title: "Conserving waterplants cheatsheet.",
      author: "Otto",
      date: new Date(Date.now() - 3000000)
    },
    {
      id: 10,
      upvotes: 59,
      title: "Could wizards prevent WW3?",
      author: "Cuthbert",
      date: new Date(Date.now() - 6000000)
    },
    {
      id: 11,
      upvotes: 46,
      title: "Show WN: Wand-Extinguishing Protection",
      author: "Humphrey22",
      date: new Date(Date.now() - 50000)
    },
    {
      id: 12,
      upvotes: 30,
      title: "Do you still use Alarte Ascendare?",
      author: "Bellatrix1",
      date: new Date(Date.now() - 6000000)
    },
    {
      id: 13,
      upvotes: 10,
      title: "Mailing lists WN readers ought to know about?",
      author: "Dracod",
      date: new Date(Date.now() - 60000)
    },
  ]);
});


//re-render the store on every request
app.get("*", (req, res, next) => {
  const store = configureStore();

  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>W Combinator</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});
