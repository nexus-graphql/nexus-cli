/*

copy a javascript file in this project to another directory

How do we write an existing JS file into another JS file in a different location

nexus_cli auth composition JS FILE => Users directory

*/
import { resolve } from "path";
// import fs from "fs";

export default () => {
  console.log(resolve(__dirname, "/hello"));
};
