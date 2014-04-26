SWEDUPHX
========

## Getting up and running

 1. Install [nodejs](http://nodejs.org/)
 2. Install [Mongodb](http://www.mongodb.org/)
 3. Run `npm install`
 4. Install bower with `npm install bower -g`
 5. Run `bower install`
 6. Install grunt with `npm install grunt -g`
 7. Replace the contents of `app/bower_components/angular-ui/.bower.json` with the following:

        {
        "name": "angular-ui",
        "homepage": "https://github.com/angular-ui/angular-ui",
        "main": ["build/angular-ui.min.js", "build/angular-ui.min.css"],
        "version": "0.4.0",
        "_release": "0.4.0",
        "_resolution": {
          "type": "version",
          "tag": "v0.4.0",
          "commit": "94f90431b3544039b0850c3d0d3cbc80b93a7891"
        },
        "_source": "git://github.com/angular-ui/angular-ui.git",
        "_target": "~0.4.0",
        "_originalSource": "angular-ui",
        "_direct": true
        }

 8. Replate the contents of `app/bower_components/socket.io-client/.bower.json` with the following:

        {
        "name": "socket.io-client",
        "homepage": "https://github.com/LearnBoost/socket.io-client",
        "version": "0.9.16",
        "main": "dist/socket.io.js",
        "_release": "0.9.16",
        "_resolution": {
          "type": "version",
          "tag": "0.9.16",
          "commit": "947d0a4c0653c901924c0aeb2c99771a9c01f705"
        },
        "_source": "git://github.com/LearnBoost/socket.io-client.git",
        "_target": "~0.9.16",
        "_originalSource": "socket.io-client",
        "_direct": true
        } 

 9. Start mongodb with `mongod`
    If this doesn't work, be sure to `sudo mkdir -p /data/db`
 10. Start a development server by running `grunt serve`
 11. The site should show up in your browser!

