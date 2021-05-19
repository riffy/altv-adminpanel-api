import express from "express"
import ip from "ip"
import * as alt from "alt-server"
import { acpDashboard } from "./dashboard.mjs";
import { acpServerStats } from "./serverstats.mjs";

const acpManager = {
    port: 9999, // Port to use for the API
    app: undefined, // Express
    secret: "REPLACETHIS", // Secret token that allows for calls

    init() {
        acpManager.app = express();
        acpManager.app.use(express.json());
        acpManager.app.use(express.urlencoded({ extended: true }));
        acpManager.app.listen(acpManager.port, () => {
            alt.log("ACP Started at : " + acpManager.getAcpAddress());
            acpManager.registerListeners();
        });
    },

    /**
     * @description Returns the address of the ACP-Api
     */
    getAcpAddress() {
        return ip.address() + ":" + acpManager.port;
    },

    /**
     * @description Adds listeners
     */
    registerListeners() {
        acpServerStats.init();
        acpDashboard.init();
    },

    /**
     * addAcpListener
     * @param  {} url
     * @param  {} action
     * @description Adds a Listener for the ACP. Will check if provided token matches the secret
     */
    addAcpListener(url, action) {
        if (acpManager.app) {
            acpManager.app.get(url, (req, res) => {
                if (!req || !req.query || !req.query.t) {
                    res.sendStatus(400);
                }
                else {
                    if (!acpManager.isValidToken(req.query.t.toString())) {
                        res.sendStatus(401);
                    }
                    else {
                        action(req, res);
                    }
                }
            });
        }
    },

    /**
     * @param  {} t
     * @description Checks if the provided token string matches the secret of the acp manager
     */
    isValidToken(t) {
        return (acpManager.secret === t);
    },
}

acpManager.init();

export { acpManager };