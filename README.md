# AntCatalog
## Getting Started
Before moving on in this section, please install Node.js and npm. It is recommended to follow the tutorial [here](https://www.youtube.com/watch?v=ohBFbA0O6hs).

### Front end
1. Enter the `client` folder in the command line and execute `npm i` to install the packages
2. Run `npm start` to begin the front end application

### Back end
1. Enter the `server` folder in the command line and execute `npm i` to install the packages
2. Run `npm run dev` to start the back end service

For other information of back end services such as testing, please visit [here](https://github.com/imliuyzh/AntCatalog/tree/main/server). 

## Built With
### Front end
+ Ant Design Charts
+ Emotion
+ Lodash
+ Material UI
+ PatternFly
+ React
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
+ Node.js
+ Nodemon
+ SuperTest
+ Sequelize
  + sqlite3
+ semistandard
+ winston

AntCatalog also uses Locust for load testing, which itself is written in Python.

## Deployment
The instruction below is written for an AWS EC2 instance with Ubuntu 20.04 installed. If there is a problem with the instructions below, please feel free to create an issue.
1. Create an instance on EC2 like [this](https://www.youtube.com/watch?v=BtxbeZx6NXM)
2. Connect to the AWS instance you just created with `ssh -i "PEM_FILE_HERE" ubuntu@AWS_INSTANCE_PUBLIC_IPV4_DNS`
3. Follow [this tutorial](https://www.youtube.com/watch?v=ohBFbA0O6hs) to install nvm
4. Clone the project to the instance and run `npm i` for both `/client` and `/server` folders
5. Run `npm run build` on `/client`
   + If there is a memory error, you can run `npm run build` and move the `/build` folder on your device to `/client` on the instance
6. Uncomment these lines in `/server/app.js
   + `app.use(express.static(path.join(__dirname, '..', 'client', 'build')));`
   + `app.get('/', (_, res) => res.sendFile(path.resolve(`${__dirname}/../client/build/index.html`)));`
7. Run `sudo apt install nginx` to install NGINX
   + Run `sudo rm /etc/nginx/sites-available/default`
   + Run `sudo vi /etc/nginx/sites-available/default`
   + Press `i` and paste
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
          proxy_cache_bypass $http_upgrade;
          proxy_redirect off;
        }
      }
      ```
   + Enter `:wq` and run `sudo service nginx stop`
8. Type `npm install pm2 -g`
9. Execute `pm2 startup` to ensure pm2 is started automatically when the OS booted
10. Install Certbot to enable HTTPS by `sudo snap install --classic certbot`
11. Inject HTTPS settings into current NGINX setting with `sudo certbot --nginx` and `sudo certbot renew`
12. Run `pm2 start index.js` and `sudo service nginx start`
    + Renew the SSL certificate by `sudo certbot renew`

You should see the website deployed when you entered the public IPv4 address of the instance.

## Acknowledgments
This project has inspirations from ZotCurve and is made possible by UC Irvine's Public Records Office.
