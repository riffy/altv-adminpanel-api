const URLS = {
    template: "acp/template"
}

export const acpTemplate = {
    
    /**
     * @description Initializes the dashboard module for the admin control panel
     */
    init() {
        acpTemplate.addListener();
    },

    /**
     * @description Adds one or more listeners (get) requests to the acp manager.
     */
    addListener() {
        acpManager.addAcpListener(URLS.template, (req, res) => {
            const info = {};
            res.status(200).send(JSON.stringify(info));
        });
    }
    
};