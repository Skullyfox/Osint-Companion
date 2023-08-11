import { exec } from "child_process";

export default () => {
    return new Promise((resolve, reject) => {
        exec("cd sherlock && python3 sherlock --version", (error, stdout, stderr) => {
            if (error) {
                reject(new Error("Sherlock not found"));
            } else {
                resolve(stdout);
            }
        });
    });
};
