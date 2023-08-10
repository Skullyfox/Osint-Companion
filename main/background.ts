import { app } from 'electron';
import serve from 'electron-serve';
import { 
  createWindow, checkPython, checkPip, 
  checkHolehe, checkGit, onlyUsed, 
  installHolehe, installGit, installPython } from './helpers';
import { ipcMain } from 'electron';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
    frame: false,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./home.html');
  } else {
    const port = process.argv[2];
    console.log(port);
    await mainWindow.loadURL(`http://localhost:${port}/home`);
  }
})();


ipcMain.handle("check-python", (event, {platform}: {platform: string}) => {
  return checkPython(platform);
});

ipcMain.handle("check-pip", (event, {platform}: {platform: string}) => {
  return checkPip(platform);
});

ipcMain.handle("check-holehe", (event, {platform}: {platform: string}) => {
  return checkHolehe(platform);
});

ipcMain.handle("check-git", () => {
  return checkGit();
});

ipcMain.handle("install-holehe", (event, {platform}: {platform: string}) => {
  return installHolehe(platform);
});

ipcMain.handle("install-git", (event, {password}: {password: string}) => {
  return installGit(password);
});

ipcMain.handle("install-python", (event, {password}: {password: string}) => {
  return installPython(password);
});

ipcMain.handle("only-used", (event, {email, platform}: {email: string, platform: string}) => {
  return onlyUsed(email, platform);
});

ipcMain.handle('get-platform', () => {
  if (process.platform == 'win32') {
    return 'windows';
  } else{
    return 'linux';
  }
});

ipcMain.handle('close-app', () => {
  app.quit();
});

app.on('window-all-closed', () => {
  app.quit();
});
