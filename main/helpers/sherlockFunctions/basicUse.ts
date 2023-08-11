import { exec } from "child_process";

const basicUse= (username: string, platform: string) => {
    return new Promise((resolve, reject) => {
        if (platform == 'windows') {
          exec(`cd sherlock && py sherlock ${username}`, (error, stdout, stderr) => {
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
          exec(`cd sherlock && python3 sherlock ${username}`, (error, stdout, stderr) => {
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
        }
      });
};

export default basicUse;