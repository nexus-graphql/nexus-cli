import { execSync } from "child_process";
import getURL from "./getURL.js";
import { log, logSuccess } from "./logger.js";

export default async () => {
  // if we change cluster name or service name
  // in terraform files this needs to be updated
  const currentURL = getURL();

  log("Redeploying your image");
  execSync(
    "aws ecs update-service --cluster backend_cluster_example_app --service backend_service --force-new-deployment"
  );

  const tryURL = setInterval(() => {
    let url;

    if (getURL() !== currentURL) {
      url = getURL();
    }

    if (url) {
      clearInterval(tryURL);
      logSuccess(
        `Your server has been successfully redeployed! Your new URL is ${url} `
      );
    }
  }, 5000);
};
