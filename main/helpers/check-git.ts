import { exec } from "child_process";

export default () => {
    return new Promise((resolve, reject) => {
        exec("git --version", (error, stdout, stderr) => {
            if (error) {
                reject(new Error("Git not found"));
            } else {
                resolve(stdout);
            }
        });
    });
};
