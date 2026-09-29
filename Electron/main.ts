import { app, BrowserWindow } from "electron";
import path from "path";

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        minWidth: 900,
        minHeight: 600,

        webPreferences: {
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    if (!app.isPackaged) {
        // Development
        win.loadURL("http://localhost:5173");
    } else {
        // Production
        const frontendPath = path.join(
            app.getAppPath(),
            "FrontEnd",
            "dist",
            "index.html"
        );

        console.log("APP PATH:", app.getAppPath());
        console.log("FRONTEND PATH:", frontendPath);

        win.loadFile(frontendPath).catch((error) => {
            console.error("LOAD FILE ERROR:", error);
        });

        win.webContents.on(
            "did-fail-load",
            (_event, errorCode, errorDescription) => {
                console.error(
                    "PAGE LOAD FAILED:",
                    errorCode,
                    errorDescription
                );
            }
        );

        // TEMPORARY: open DevTools
        // win.webContents.openDevTools();
    }
};


app.whenReady().then(() => {

    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});