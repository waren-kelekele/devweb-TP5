import http from "node:http";

const host = "localhost";
const port = 8000;

// function requestListener(_request, response) {
//   response.writeHead(200);
//   response.end("<html><h1>My first server!<h1></html>");
// }

import fs from "node:fs/promises";

// function requestListener(_request, response) {
//   fs.readFile("index.html", "utf8")
//     .then((contents) => {
//       response.setHeader("Content-Type", "text/html");
//       response.writeHead(200);
//       console.log("NODE_ENV =", process.env.NODE_ENV);
//       return response.end(contents);
//     })
//     .catch((error) => console.error(error));
// }


// async function requestListener(request, response) {
//     response.setHeader("Content-Type", "text/html");
//     try {
//       const contents = await fs.readFile("index.html", "utf8");
//       switch (request.url) {
//         case "/index.html":
//           response.writeHead(200);
//           return response.end(contents);
//         case "/random.html":
//           response.writeHead(200);
//           return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
//         default:
//           response.writeHead(404);
//           return response.end(`<html><p>404: NOT FOUND</p></html>`);
//       }
//     } catch (error) {
//       console.error(error);
//       response.writeHead(500);
//       return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
//     }
//   }


async function requestListener(request, response) {
    response.setHeader("Content-Type", "text/html");
    try {
      const contents = await fs.readFile("index.html", "utf8");
      
      switch (request.url) {
        case "/index.html":
          response.writeHead(200);
          return response.end(contents);
        case "/random.html":
          response.writeHead(200);
          return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
        default:
         ///syntaxe ci dessous j'ai trouvé sur internet ' /^\/random\/(\d+)$/
          const randomRouteMatch = /^\/random\/(\d+)$/.exec(request.url);
          if (randomRouteMatch) {
            const nb = parseInt(randomRouteMatch[1], 10);
            if (!isNaN(nb)) {
              const randomNumbers = Array.from({ length: nb }, () => Math.floor(100 * Math.random()));
              response.writeHead(200);
              return response.end(`<html><p>${randomNumbers.join(', ')}</p></html>`);
            }
          }
          response.writeHead(404);
          return response.end(`<html><p>404: NOT FOUND</p></html>`);
      }
    } catch (error) {
      console.error(error);
      response.writeHead(500);
      return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
  }
  


const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

