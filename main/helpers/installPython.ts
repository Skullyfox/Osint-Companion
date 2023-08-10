import { spawn } from 'child_process';

export default (sudoPassword) => {
    return new Promise((resolve, reject) => {
        const command = spawn('sudo', ['-S', 'apt-get', 'install', '-y', 'python3']);

        command.stdin.write(`${sudoPassword}\n`);
        command.stdin.end();

        command.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        command.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
            reject(new Error(data));
        });

        command.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Command exited with code: ${code}`));
            } else {
                resolve("Success");
            }
        });
    });
};
