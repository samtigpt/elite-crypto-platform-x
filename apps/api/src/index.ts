import { createServer } from "node:http";
import { logger } from "@ecpx/core";

const PORT = 3000;

const server = createServer((_req, res) => {
  res.writeHead(200, {
    "content-type": "application/json"
  });

  res.end(
    JSON.stringify({
      service: "ecpx-api",
      healthy: true,
      version: "0.1.0"
    })
  );
});

server.listen(PORT, () => {
  logger.info(`ECPX API running on port ${PORT}`);
});