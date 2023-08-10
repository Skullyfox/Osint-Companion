import { exec } from "child_process";

const installHolehe = (platform: string) => {
    return new Promise((resolve, reject) => {
        if (platform === 'windows') {
            exec("git clone https://github.com/megadose/holehe.git && cd holehe && py setup.py install", 
                (error, stdout, stderr) => {
                    if (error) {
                        reject(new Error("Failed to install Holehe on Windows"));
                    } else {
                        resolve(stdout);
                    }
                }
            );
        } else if (platform === 'linux') {
            exec("pip install holehe", (error, stdout, stderr) => {
                if (error) {
                    reject(new Error("Failed to install Holehe on Linux"));
                } else {
                    resolve(stdout);
                }
            });
        } else {
            reject(new Error("Unsupported platform"));
        }
    });
};

export default installHolehe;