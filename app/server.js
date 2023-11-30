// internal modules
const path = require('path');

// external modules
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')

// swagger
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { router } = require('./routers');

module.exports = class Application {
    #app = express();
    #DB_URI;
    #PORT;
    constructor(PORT, DB_URI){
        this.#PORT = PORT;
        this.#DB_URI = DB_URI;
        this.applicationConfigs();
        this.mongoConfigs();
        this.createServer();
        this.routerConfigs();
    };

    // initials app configs
    applicationConfigs(){
        // publics configs
        this.#app.use(cors());
        this.#app.use(morgan('dev'));
        this.#app.use(express.static(path.join(__dirname, '..', 'public')));
        this.#app.use(bodyParser.json());
        this.#app.use(bodyParser.urlencoded({ extended: true }));

        // ejs configs 
        this.#app.set('view engine', 'ejs');
        this.#app.set('views', path.resolve('../resourse/view'));

        // sessions
        this.#app.use(session({
            secret: 'my-secret-key',
            resave: true,
            saveUninitialized: true,
        }));
        
        // cookie-parser
        this.#app.use(cookieParser('my-secret-key'));
        this.#app.use(flash());


        // swagger configs
        this.#app.use(
            "/api-docs",
            swaggerUI.serve,
            swaggerUI.setup(
                swaggerJsDoc({
                    swaggerDefinition: {
                        openapi: '3.0.0',
                        info: {
                            title: "Marketplace",
                            version: "1.0.0",
                            contact: {
                                name: "Payam Mohtashami",
                                email: "p.mohtashami.1382.4@gmail.com",
                            },
                        },
                        servers: [
                            {url: `http://localhost:${this.#PORT}`}
                        ],
                        components: {
                            securitySchemes: {
                                BearerAuth: {
                                    type: "http",
                                    scheme: 'bearer',
                                    bearerFormat: 'JWT'
                                },
                            },
                        },
                        security: [{BearerAuth: []}]
                    },
                    apis: ["./app/routers/**/*.js"],
                }),
                {explorer: true}
            )
        );
    };

    // mongo DB configs
    mongoConfigs(){
        mongoose.connect(this.#DB_URI).then(() => {
            console.log('Server Connected To mongoDB 😍');
        }).catch((error) => {
            console.log({error});
        });
        mongoose.connection.on('connected', () => {
            console.log('mongoose connected to DB');
        });
        mongoose.connection.on('disconncted', () => {
            console.log('mongoose connection is disconnected!');
        });
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        });
    };

    // create and run HTTP server
    createServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log(`Server run on port http://localhost:${this.#PORT}`);
        });
    };

    routerConfigs(){
        this.#app.use('/', router)
    };
};