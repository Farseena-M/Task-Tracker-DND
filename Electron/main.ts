import { app, BrowserWindow } from "electron";
import path from "path";
import { spawn } from "child_process";

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
        win.webContents.openDevTools();
    }
};

const startBackend = () => {
    const backendPath = path.join(
        __dirname,
        "../BackEnd/dist/server.js"
    );

    const backend = spawn("node", [backendPath], {
        cwd: path.join(__dirname, "../BackEnd"),
        stdio: "inherit",
    });

    backend.on("error", (error) => {
        console.error("Backend failed to start:", error);
    });

    return backend;
};

app.whenReady().then(() => {
    // Production
    if (app.isPackaged) {
        startBackend();
    }
    // Development
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