# altv-adminpanel-api
This project serves as an example for integrating an api into an ALT:V GTA V server. It provides basic usage with another project that is currently being worked upon.

# Usage

## Requirements
-   NodeJS
-   Alt:V

## Installation & First Start

1. Copy the contents of this repo to `altv-server\resources\altv-adminpanel-api`
2. Run `npm install` in the directory
3. Start server
4. Open a browser and go to `http://localhost:9999/acp/dashboard?t=REPLACETHIS`

You should see this:

![example](https://user-images.githubusercontent.com/13089522/118709976-f9d54c80-b81d-11eb-821f-29b014a4c2e7.PNG)

## Modify

1. Change the secret to one that suits you, be vary of http arguments (avoid &, ?, % etc.) in `index.mjs`
2. New listeners can be added with `addAcpListener`. Consult the comments.


# Control Panel
For the control panel, please look at my other repository https://github.com/riffy/gta-adminlte-django so you can do something neat like this

![woop_woop](https://user-images.githubusercontent.com/13089522/118840206-77a16280-b8c7-11eb-82ce-074122c8dfeb.PNG)

