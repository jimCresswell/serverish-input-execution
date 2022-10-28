// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("/send/user/input", async (req, res, ctx) => {
    const userInput = await req.json();

    // Persist data
    sessionStorage.setItem("user-input", JSON.stringify(userInput));

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/execute/user/input", async (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const rawUserInput = sessionStorage.getItem("user-input");
    const userInput = JSON.parse(rawUserInput);

    if (!userInput) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(200),
        ctx.json({
          warning: "No user input stored",
        })
      );
    }

    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        userInput,
      })
    );
  }),
];
