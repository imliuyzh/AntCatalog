# AntCatalog
## Getting Started
Before moving on in this section, please install the latest LTS version of Node.js and npm. It is recommended to follow the tutorial [here](https://www.youtube.com/watch?v=ohBFbA0O6hs).

### Front end
1. Enter the `client` folder in the command line and execute `npm i` to install the packages
2. Run `npm start` to begin the front end application

### Back end
1. Enter the `server` folder in the command line and execute `npm i` to install the packages
2. Run `npm run dev` to start the back end service
   + If there is an error about ts-node, run `npm i -g ts-node`

For other information of back end services such as testing, please visit [here](https://github.com/imliuyzh/AntCatalog/tree/main/server). 

## Built With
### Front end
+ Ant Design Charts
+ Emotion
+ Lodash
+ Material UI
+ PatternFly
+ React
+ React Router
+ Redux
  + React Redux
  + redux-thunk
+ UUID

### Back end
+ Express.js
  + apicache
  + compression
  + CORS
  + Express Rate Limit
  + express-validator
  + Helmet
  + node-cache
+ Fuse.js
+ Jest
  + ts-jest
+ Node.js
+ Nodemon
+ SuperTest
+ Sequelize
  + sqlite3
+ TypeScript
  + ts-node
+ winston

AntCatalog also uses Locust for load testing, which itself is written in Python.

## Deployment
Please ensure your operating system is able to initiate a SSH/SCP session. If there is a problem with the instructions below, please feel free to create an issue.

### Amazon Elastic Compute Cloud (EC2)
The instruction below is written for an AWS EC2 instance with Ubuntu v20.04 installed.
1. Create an instance on EC2 like [this](https://www.youtube.com/watch?v=GEVbYQWWJkQ)
   + Restrict SSH access to your IP address only and allow HTTP/HTTPS connections from everywhere with the security group feature
2. Connect to the AWS instance you just created with `ssh -i "PEM_FILE_HERE" ubuntu@AWS_INSTANCE_PUBLIC_IPV4_DNS`
3. Follow [this tutorial](https://www.youtube.com/watch?v=ohBFbA0O6hs) to install nvm
   + Remember to install the latest LTS version of Node.js and npm
4. Clone the project to the instance and run `npm i` for both `/client` and `/server`
5. Run `npm run build` on `/client`
   + If there is a memory error, you can run `npm run build` locally and move the `/build` folder to `/client` on the instance
6. Run `sudo apt install nginx` to install NGINX
   + Run `sudo service nginx stop` and `sudo rm /etc/nginx/sites-available/default`
   + Run `sudo touch /etc/nginx/sites-available/default`
   + Paste the code snippet below into the file you just created
      ```
      server {
          listen 80;
          server_name your_domain.com www.your_domain.com;
          location / {
              proxy_pass http://127.0.0.1:26997;
              proxy_http_version 1.1;
              proxy_set_header Upgrade $http_upgrade;
              proxy_set_header Connection 'upgrade';
              proxy_set_header Host $host;
              proxy_set_header X-Forwarded-For $remote_addr;
              proxy_cache_bypass $http_upgrade;
              proxy_redirect off;
          }
      }
      ```
7. Execute `npm install pm2 -g` and `pm2 startup`
   + Copy and paste the generated command to ensure pm2 is started automatically when the OS booted
8. Install Certbot to enable HTTPS by `sudo snap install --classic certbot`
9. Inject HTTPS settings into current NGINX setting with `sudo certbot --nginx` and answer the questions based on your circumstances
    + Renew the SSL certificate by `sudo certbot renew`
    + You can also automate the renewal by replacing the content in `/etc/cron.d/certbot`
      ```
      SHELL=/bin/sh
      PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

      0 */12 * * * root certbot -q renew --nginx
      ```
10. Run `npm run build`, `npm start`, and `sudo service nginx start` on `/server`

You should see the website deployed when you entered the public IPv4 address of the instance.

## Acknowledgments
This project has inspirations from ZotCurve and is made possible by UC Irvine's Public Records Office.
