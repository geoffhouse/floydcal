import { promises as fs } from "fs";
import yaml from "js-yaml";

export default async (filename) => {
    const fileContents = await fs.readFile(`${process.cwd()}/src/config/${filename}`, "utf8");
    return yaml.load(fileContents);
};
