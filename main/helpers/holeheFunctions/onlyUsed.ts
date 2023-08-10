import { exec } from "child_process";

const onlyUsed = (email: string, platform: string) => {
    return new Promise((resolve, reject) => {
        if (platform == 'windows') {
          exec(`holehe ${email} --only-used`, (error, stdout, stderr) => {
            if (error) {
              reject(new Error("Something went wrong"));
            } else {
              const lines = stdout.split('\n');
              console.log(lines);
              const websites = lines.filter(line => line.startsWith('[+]'));
              const websiteNames = websites.map(line => line.slice(4).trim());
              websiteNames.pop();
              //console.log(websiteNames);
              resolve(websiteNames);
            }
          });
        } else if (platform == 'linux') {
          exec(`holehe ${email} --only-used`, (error, stdout, stderr) => {
            if (error) {
              reject(new Error("Something went wrong"));
            } else {
              const ansiEscapeCodes = /\x1B(?:[@-Z\\-_]|\[[0-?]*[ -/]*[@-~])/g;
              const lines = stdout.split('\n');
              console.log(lines);
              const websites = lines.filter(line => line.startsWith('\x1B[32m[+]'));
              const websiteNames = websites.map(line => {
                const cleanLine = line.replace(ansiEscapeCodes, '').replace('[+]', '').trim();
                return cleanLine;
              });
              websiteNames.pop();
              //console.log(websiteNames);
              resolve(websiteNames);
            }
          });
        }
      });
};

export default onlyUsed;