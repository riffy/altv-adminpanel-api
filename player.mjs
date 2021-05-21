import * as alt from "alt-server";
import { acpManager } from "./index.mjs";
import { acpServerStats } from "./serverstats.mjs";

const acpPlayer = {
    /**
     * @description Initializes the dashboard module for the admin control panel
     */
     init() {
        acpPlayer.addListener();
    },

    /**
     * @description Adds one or more listeners (get) requests to the acp manager.
     */
     addListener() {
        acpManager.addAcpListener("/acp/playerlist", (req, res) => {
            const info = [];
            alt.Player.all.forEach((p) => {
                info.push({
                    id: p.id,
                    name: p.name,
                    socialId: p.socialId,
                    ip: p.ip,
                    ping: p.ping
                });
            });
            res.status(200).send(JSON.stringify(info));
        });

        acpManager.addAcpListener("/acp/playerinfo", (req, res) => {
            if (!req.query.id) {
                res.sendStatus(400);
            }
            else {
                let data = {
                    collection : [],
                    info: {}
                };
                alt.Player.all.forEach((p) => {
                    data.collection.push({
                        id: p.id,
                        name: p.name
                    });
                    if (p.id === Number(req.query.id)) {
                        data.info = {
                            id: p.id,
                            name: p.name,
                            socialId: p.socialId,
                            ip: p.ip,
                            ping: p.ping,
                            connected: acpServerStats.getConnectionDateForPlayerId(p.id),
                            health: p.health,
                            armour: p.armour,
                            dimension: p.dimension,
                            pos: p.pos,
                            rot: p.rot
                        }
                    }
                });
                res.status(200).send(JSON.stringify(data));
            }
        });
    },
};

export { acpPlayer };