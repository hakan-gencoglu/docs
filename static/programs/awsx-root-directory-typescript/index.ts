import * as awsx from "@pulumi/awsx";
import * as pulumi from "@pulumi/pulumi";
import * as path from "path";
import * as process from "process";

const root = pulumi.getRootDirectory();
const cwd = process.cwd();
const appPath = path.join(root, "app");
const relativePath = path.relative(cwd, appPath);

const repository = new awsx.ecr.Repository("repository", {
    forceDelete: true,
});

const image = new awsx.ecr.Image("image", {
    repositoryUrl: repository.url,
    context: relativePath,
    platform: "linux/amd64",
});

export const url = repository.url;
