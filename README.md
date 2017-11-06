Basic Node

This is a basic example of a node.js api with mongoose and express.  The example is based off of the link below, but with a few small differences, mostly between the model.  This example is meant to be run locally, though I have also included brief instructions below on how to get it running on a Ubuntu 16.04 server. 


Ubuntu 16.04 Config

1. cd ~
2. curl -sL https://deb.nodesource.com/setup_6.x -o nodesource_setup.sh
3. bash nodesource_setup.sh
4. apt-get install nodejs
5. apt-get install build-essential
6. npm install -g express-generator
7. mkdir < directory of project > 
8. cd <directory of project > 
9. express
10. npm install
11. npm install mongoose 
12. install MongoDb - note : project config for mongodb will be reachable through localhost.
13. config project to run - calls will be reachable through http://<ip>:<port>/<endpoint>.  Ex. http://11.11.111.111:3000/api


Refs: 

Local Project
https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4
https://scotch.io/tutorials/an-introduction-to-mongodb

Ubuntu Config ( steps ) 
1-5 : https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04
6-11: https://www.digitalocean.com/community/tutorials/how-to-install-express-a-node-js-framework-and-set-up-socket-io-on-a-vps
12  : https://www.linode.com/docs/databases/mongodb/install-mongodb-on-ubuntu-16-04
13  : http://timmyreilly.azurewebsites.net/running-node-and-express-on-ubuntu-vm/
