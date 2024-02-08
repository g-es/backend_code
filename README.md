# What is this project?

This is a **Node.js** [Express](https://www.npmjs.com/package/express) API server.

The API server runs locally on your machine; it does not use Docker or any other container service.

The API server consumes the following backend resources:
- Cloud-based Postgres SQL Database

# Project Setup

This is a **Node.js** project.
On your local machine, you should use versions compatible with the following:
```
node --version;
v20.11.0
```
```
npm --version;
10.2.4
```

> These versions are not strict. But for desired/consistent behavior, use major versions at least at what is stated.

## Install the NPM packages

Run:
```
npm install;
```


## Create your local `.env` file
Use either this:
```
ln -s .env.sample .env;
```
OR this:
```
cp .env.sample .env;
```

You'll need to place a value for `DATABASE_HOST` & `DATABASE_PASSWORD`. You'll be given these values.

# Starting the API server

Run:
```
npm run start;
```

# Stopping the API server

Press:
```
^C
```
> aka. this is `CTRL` + `c`

# Testing the API

You can use anything you desire to test the API endpoints with.

You can even navigate to the endpoints a in web-browser.

Using __PostMan__ will yield benefits.

# Here for the code test?

Look at the other `README.*.md` files in this project's root.