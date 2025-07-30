"use strict";
const pulumi = require("@pulumi/pulumi");
const awsx = require("@pulumi/awsx");
const path = require("path");
const process = require("process");


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

exports.url = repository.url;
