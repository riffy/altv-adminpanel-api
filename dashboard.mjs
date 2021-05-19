import { acpManager } from "./index.mjs";
import * as alt from "alt-server";

const acpDashboard = {
    startdate: 0, // Used for counting uptime
    visits: 0, // socialid

    /**
     * @description Initializes the dashboard module for the admin control panel
     */
    init() {
        acpDashboard.addListener();
        acpDashboard.registerEvents();
        acpDashboard.startdate = new Date();
    },

    /**
     * @description Register several events, such as alt events etc.
     */
    registerEvents() {
        alt.on('playerConnect', (player) => {
            acpDashboard.visits++;
        });
    },

    /**
     * @description Adds one or more listeners (get) requests to the acp manager.
     */
    addListener() {
        acpManager.addAcpListener("/acp/dashboard", (req, res) => {
            const info = {
                uptime: ((new Date().getTime() - acpDashboard.startdate.getTime()) / 1000),
                onlinePlayers: alt.Player.all.length,
                visits: acpDashboard.visits
            };
            res.status(200).send(JSON.stringify(info));
        });
    }
};

export { acpDashboard };