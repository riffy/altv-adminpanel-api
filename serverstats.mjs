import { acpManager } from "./index.mjs";
import * as alt from "alt-server";

const acpServerStats = {
    startdate: 0, // Used for counting uptime
    visits: [], // { socialId, ip, altv-name, connected, disconnected }

    /**
     * @description Initializes the dashboard module for the admin control panel
     */
    init() {
        acpServerStats.startdate = new Date();
        acpServerStats.registerEvents();
        acpServerStats.addListener();
    },

    /**
     * @description Register several events, such as alt events etc.
     */
    registerEvents() {
        alt.on('playerConnect', (player) => {
            acpServerStats.visits.push({
                socialId: player.socialId,
                ip: player.ip,
                name: player.name,
                connected: new Date(),
                disconnected: ""
            });
        });

        alt.on('playerDisconnect', (player) => {
            acpServerStats.visits.forEach((visit) => {
                if (visit && visit.socialId === player.socialId && visit.disconnected === "") {
                    visit.disconnected = new Date();
                }
            });
        });
    },

    /**
     * @description Adds one or more listeners (get) requests to the acp manager.
     */
    addListener() {
        acpManager.addAcpListener("/acp/serverstats", (req, res) => {
            const info = {
                uptime: acpServerStats.calculateUptime(),
                onlinePlayers: alt.Player.all.length,
                visits: acpServerStats.visits
            };
            res.status(200).send(JSON.stringify(info));
        });
    },

    /**
     * @description Calulates the uptime of server and returns time in seconds.
     */
     calculateUptime() {
        return ((new Date().getTime() - acpServerStats.startdate.getTime()) / 1000);
    }
};

export { acpServerStats };