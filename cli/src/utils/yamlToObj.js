/*
run this with node yamlToObj.js <templateName>
*/

import pkg from "js-yaml";
import { readFileSync, writeFileSync } from "fs";
import { cwd } from "process";

const { load } = pkg;

const yamlToObj = () => {
  const templateName = process.argv[2];

  const template = load(
    readFileSync(
      `${cwd()}/../configTemplates/yamlTemplates/${templateName}.yaml`,
      "utf8"
    )
  );

  writeFileSync(
    `cwd()/../configTemplates/${templateName}.js`,
    `export default ${JSON.stringify(template)}`,
    "utf8"
  );
};

yamlToObj();
