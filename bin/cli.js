#!/usr/bin/env node
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

if (process.argv.length < 4) {
    console.log('You have to provide a name to your app and project template');
    console.log('For example :');
    console.log('    npx create-my-boilerplate my-app next-ts');
    process.exit(1);
}

const projectName = process.argv[2];
const projectTemplate = process.argv[3];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = "https://github.com/piyush-jaiswal-projects/rapidstart";

async function main() {
    try {
        switch (projectTemplate) {
            case "react-js": break;
            case "react-ts": break;
            case "next-ts": break;
            case "express-ts": break;
            default: throw new Error("Invalid project template!")
        }
    } catch (error) {
        console.log(`Invalid project template!`);
        console.log("Valid templates: \n react-js \n react-ts \n next-ts \n express-ts \n");
        process.exit(1)
    }

    try {
        fs.mkdirSync(projectPath);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.log(`The file ${projectName} already exist in the current directory, please give it another name.`);
        } else {
            console.log(error);
        }
        process.exit(1);
    }

    try {
        console.log('Downloading files...');
        execSync(`git clone --depth 1 ${git_repo} ${projectPath}`);

        process.chdir(projectPath);

        console.log('Configuring sparse checkout...');
        fs.writeFileSync('.git/info/sparse-checkout', `/${projectTemplate}/*\n`);
        execSync('git config core.sparsecheckout true');
        execSync('git read-tree -mu HEAD');

        console.log('Moving files...');
        const templatePath = path.join(projectPath, projectTemplate);
        const files = fs.readdirSync(templatePath);

        files.forEach(file => {
            const srcPath = path.join(templatePath, file);
            const destPath = path.join(projectPath, file);
            fs.renameSync(srcPath, destPath);
        });

        fs.rmSync(templatePath, { recursive: true });

        console.log('Installing dependencies...');
        execSync('npm install');

        console.log('Removing unwanted files');
        execSync('npx rimraf ./.git');

        console.log('The installation is done, this is ready to use !');

    } catch (error) {
        console.log(error);
        execSync(`rm -rf ${projectPath}`)
    }
}
main();