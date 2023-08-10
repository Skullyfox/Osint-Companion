import { exec } from "child_process";

export default (platform) => {
  return new Promise((resolve, reject) => {
        console.log("================platform===================")
        console.log(platform)
        if (platform === "windows") {
            exec("py -m pip list", (error, stdout, stderr) => {
                if (error) {
                    reject(new Error("Something went wrong"));
                } else {
                    const isHoleheInstalled = stdout.includes("holehe");
                    resolve(isHoleheInstalled);
                }
            });
        } else if (platform === "linux") {
            exec("pip list", (error, stdout, stderr) => {
                if (error) {
                    reject(new Error("Something went wrong"));
                } else {
                    const isHoleheInstalled = stdout.includes("holehe");
                    resolve(isHoleheInstalled);
                }
            });
        } else {
            reject(new Error("Unsupported platform"));
        }
    });
};
