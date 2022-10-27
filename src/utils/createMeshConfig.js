import pkg from "js-yaml";
import { cwd } from "process";
import { writeFileSync } from "fs";
import baseTemplate from "../configTemplates/base.js";

const { dump } = pkg;

export default (name, connectionString) => {
  const template = JSON.parse(JSON.stringify(baseTemplate));
  template.sources[0].name = name;
  template.sources[0].handler.postgraphile.connectionString = connectionString;

  writeFileSync(`${cwd()}/.meshrc.yaml`, dump(template), "utf8");
};
