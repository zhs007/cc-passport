# cc-passport

This is a coding challenge for passport.  
This service is based on [pro.ant.design](https://pro.ant.design/).  
The service is [cc-passportserv](https://github.com/zhs007/cc-passportserv).  

These jobs are not completed
- Unique check for input email and username
- Unit testing of the front end
- RESTful API
- Code optimization and add more comments

### Docker Deployment

- Deploy cc-passportserv with docker
- ``sh buildwithdocker.sh``
- Configure ``nginx.conf.d/default.conf``, API forwarding address
- ``sh startwithdocker.sh``