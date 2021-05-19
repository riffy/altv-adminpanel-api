import { acpManager } from "./index.mjs";
import * as alt from "alt-server";
import { acpServerStats } from "./serverstats.mjs";

const acpDashboard = {
    visits: 0, // socialid

    /**
     * @description Initializes the dashboard module for the admin control panel
     */
    init() {
        acpDashboard.registerEvents();
        acpDashboard.addListener();
    },

    /**
     * @description Register several events, such as alt events etc.
     */
    registerEvents() {
        //
    },

    /**
     * @description Adds one or more listeners (get) requests to the acp manager.
     */
    addListener() {
        acpManager.addAcpListener("/acp/dashboard", (req, res) => {
            const info = {
                uptime: acpServerStats.calculateUptime(),
                onlinePlayers: alt.Player.all.length,
                visits: acpServerStats.visits.length
            };
            res.status(200).send(JSON.stringify(info));
        });
    },
};

export { acpDashboard };