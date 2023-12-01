# BRI-Webapp
Web UI application in BRI project

## Tech Stack

**Server:** 

- Node.js: 16
- Yarn: 1.22.9

## Installation Instructions
**Environment Variables**

Stage  | File Name | Description
------------- | ------------- |  -------------
dev  | config.dev.json | contains variables relating dev variables such as api port, endpoint, etc.
stage  | config.stage.json | contains variables relating stage variables such as port, api endpoint, etc.
prod  | config.production.json | contains variables relating production variables such as port, api endpoint, etc.


**Install Packages**

```
  cd bri-webapp
  yarn
```

**Start Application**

- To start the API application, run the start script as below. Web app is running at Port 2001 which refer to config.dev.json
```
  yarn dev
```