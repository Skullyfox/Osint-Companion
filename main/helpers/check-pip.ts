import { exec } from "child_process";

export default (platform) => {
  return new Promise((resolve, reject) => {
    if (platform === "windows") {
      exec("py -m pip --version", (error, stdout, stderr) => {
        if (error) {
          reject(new Error("Pip not found"));
        } else {
          resolve(stdout);
        }
      });
    } else if (platform === "linux") {
      exec("pip --version", (error, stdout, stderr) => {
        if (error) {
          reject(new Error("Pip not found"));
        } else {
          resolve(stdout);
        }
      });
    } else {
      reject(new Error("Unsupported platform"));
    }
  });
};
