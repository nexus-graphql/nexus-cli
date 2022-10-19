/*
run this with node yamlToObj.js <templateName>
*/

import pkg from "js-yaml"; // not configured for es6 modules, so can't destructure?
const { load } = pkg;
import { readFileSync, writeFileSync } from "fs";
import { cwd } from "process";
// import argv from "process";

const yamlToObj = () => {
  const templateName = process.argv[2];

  const template = load(
    readFileSync(
      cwd() + `/../configTemplates/yamlTemplates/${templateName}.yaml`,
      "utf8"
    )
  );

  writeFileSync(
    cwd() + `/../configTemplates/${templateName}.js`,
    "export default " + JSON.stringify(template),
    "utf8"
  );
};

yamlToObj();
