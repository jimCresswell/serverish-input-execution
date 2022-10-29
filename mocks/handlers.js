// src/mocks/handlers.js
import { rest } from "msw";

const EXTRACTION_KEY_KEY = "extractionKey";

// Server-side code;
let serverSideFunction;

export const handlers = [
  rest.post("/server/update", async (req, res, ctx) => {
    const userInput = await req.json();

    // Update server side code;
    try {
      serverSideFunction = Function(userInput);
    } catch (err) {
      return res(ctx.status(500), ctx.json({ error: err.message }));
    }

    // // Persist data
    // sessionStorage.setItem("user-input", JSON.stringify(userInput));

    return res(
      // Respond with a 200 status code
      ctx.status(200)
    );
  }),

  rest.get("/server/execute", async (req, res, ctx) => {
    // // Get persisted data.
    // const rawServerInput = sessionStorage.getItem("user-input");

    // Check the server-side code has been updated by the user.
    if (!serverSideFunction) {
      return res(
        ctx.status(200),
        ctx.json({
          warning: "No user inputted code on server, please 'Update Server'",
        })
      );
    }

    const searchParams = req.url.searchParams;
    const rawExtractionKey = searchParams.get(EXTRACTION_KEY_KEY);

    // Debug
    console.log("server side");
    console.log("extractionKey", rawExtractionKey);

    if (!rawExtractionKey) {
      return res(
        ctx.status(200),
        ctx.json({
          warning: "Please make sure you specify and '{extractionKey: ...}'",
        })
      );
    }
    const extractionKey = decodeURIComponent(rawExtractionKey);
    const serverData = serverSideFunction();
    const extractedValue = serverData[extractionKey];

    if (!extractedValue) {
      return res(
        ctx.status(200),
        ctx.json({
          warning: `Could not find values for key: "${extractionKey}"`,
        })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({
        result: extractedValue,
      })
    );
  }),
];
