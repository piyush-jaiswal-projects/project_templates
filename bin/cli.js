#!/usr/bin/env node
const { execSync } = require('child_process');

const runCommand = command => {
    try {
        execSync(`${command}`, { stdio: 'inherit' });
    } catch (e) {
        console.error(`Failed to execute ${command}`, e);
        return false;
    }
    return true;
};

const repoName = process.argv[2];
const subdirectory = process.argv[3];

if (!repoName || !subdirectory) {
    console.error("Usage: create-project <repository-name> <subdirectory>");
    process.exit(-1);
}

const gitCloneCommand = `git clone --depth 1 --single-branch --branch main https://github.com/piyush-jaiswal-projects/project_templates ${repoName}`;
const gitSparseCheckoutCommand = `cd ${repoName} && git config core.sparseCheckout true && echo "${subdirectory}/*" >> .git/info/sparse-checkout && git checkout main`;
const installDepsCommand = `cd ${repoName}/${subdirectory} && npm install`;

console.log(`Cloning the repository with name ${repoName}`);
const checkOut = runCommand(gitCloneCommand);
if (!checkOut) process.exit(-1);

console.log(`Cloning the subdirectory ${subdirectory}`);
const sparseCheckout = runCommand(gitSparseCheckoutCommand);
if (!sparseCheckout) process.exit(-1);

console.log(`Installing dependencies in ${subdirectory}`);
const installedDeps = runCommand(installDepsCommand);
if (!installedDeps) process.exit(-1);

console.log("Congratulations! You are ready. Follow the following commands to start");
