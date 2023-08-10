import { exec } from "child_process";

export default (platform) => {
    return new Promise((resolve, reject) => {
      if(platform === "windows"){
        exec("py --version", (error, stdout, stderr) => {
          if (error) {
            reject(new Error("Python3 not found"));
          } else {
            resolve(stdout);
          }
        });
      } else if(platform === "linux"){
        exec("python3 --version", (error, stdout, stderr) => {
          if (error) {
            reject(new Error("Python3 not found"));
          } else {
            resolve(stdout);
          }
        });
      } else {
        reject(new Error("Unsupported platform"));
      }
    });
};
