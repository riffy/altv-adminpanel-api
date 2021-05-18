import express from "express"
import ip from "ip"
import * as alt from "alt-server"

export const acpManager = {
    startdate: 0, // Used for counting uptime
    port: 9999, // Port to use for the API
    app: undefined, // Express
    secret: "REPLACETHIS", // Secret token that allows for calls

    init() {
        acpManager.app = express();
        acpManager.app.use(express.json());
        acpManager.app.use(express.urlencoded({ extended: true }));
        acpManager.app.listen(acpManager.port, () => {
            alt.log("ACP Started at : " + acpManager.getAcpAddress());
            acpManager.startdate = new Date();
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
        acpManager.addDashboardListener();
    },

    /**
     * @description Adds the listener for the dashboard view with uptime and online players.
     */
    addDashboardListener() {
        acpManager.addAcpListener("/acp/dashboard", (req, res) => {
            const dashboardinfo = {
                uptime: ((new Date().getTime() - acpManager.startdate.getTime()) / 1000),
                onlinePlayers: alt.Player.all.length
            };
            res.status(200).send(JSON.stringify(dashboardinfo));
        });
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
                if (!req || !req.query || !req.query.token) {
                    res.sendStatus(400);
                }
                else {
                    if (!acpManager.isValidToken(req.query.token.toString())) {
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
    }
}

acpManager.init();