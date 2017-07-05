# trackerTimer API Server  

This is the source code repository for the trackerTimer API server.  

## Getting started  

This API is deployed to [Heroku](https://www.heroku.com/), and can be accessed at https://trackertimerapi.herokuapp.com/.  

### Network Analysis  

The API uses [PhantomJS](http://phantomjs.org/) with [confess.js](https://github.com/jamesgpearce/confess) to generate [network analysis](http://phantomjs.org/network-monitoring.html) waterfall diagrams.  

To generate a report, include a URL as a query string parameter. For example, to generate a report for the URL https://www.github.com you would go to:  

https://trackertimerapi.herokuapp.com/?url=https://www.github.com  

ℹ **Note**: *trackerTimer is an alpha, open-source project.*  

## Show your support  

Support this project by [making a pledge via Patreon](https://www.patreon.com/jmg1138).  
