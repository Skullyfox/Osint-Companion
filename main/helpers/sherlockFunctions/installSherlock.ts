import { exec } from "child_process";

const installSherlock = (platform: string) => {
    return new Promise((resolve, reject) => {
        if (platform === 'windows') {
            exec("git clone https://github.com/sherlock-project/sherlock.git && cd sherlock && py  -m pip install -r requirements.txt", 
                (error, stdout, stderr) => {
                    if (error) {
                        reject(new Error("Failed to install Holehe on Windows"));
                    } else {
                        resolve(stdout);
                    }
                }
            );
        } else if (platform === 'linux') {
            exec("git clone https://github.com/sherlock-project/sherlock.git && cd sherlock && python3 -m pip install -r requirements.txt", 
                (error, stdout, stderr) => {
                    if (error) {
                        reject(new Error("Failed to install Holehe on Linux"));
                    } else {
                        resolve(stdout);
                    }
                }
            );
        } else {
            reject(new Error("Unsupported platform"));
        }
    });
};

export default installSherlock;