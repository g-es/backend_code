# Code Test 2024-01

-----

If you ran this right now `npm run install; npm run start;`, you'll have a API server listening for requests. But those requests don't have anything behind them.

The overall goal is broken into tasks outlined below that will ultimately have our API serve meaningful data.

-----

# Task 00
There are `/migration_source_data/models/*.json` data dump files from a NoSQL database and we need it stored in our Postgres database.

The reason for the migration is because there was not enough query flexibility in the systems built around NoSQL. Some properties in the data need to be flattened.

You are to find a sensible way to store this data in the Postgres database so it is:

- __Queryable__ - The most important fields should be stored in a plain way that we easily filter, sort, & match against the records. You decide what fields seem important.
- __Performant__ - Some record data is important enough to be indexed to greatly accelerate queries. You decide what you want to do here. Think of this database table eventually having millions of rows while having to maintain excellent query performance.
- __Extensible__ - The decisions you make about how to store the data lock us into that direction for future development. Make thoughtful decisions about how you're storing the data.
- __Maintainable__ - The decisions you make about how to store the data might make things needlessly complex and thus hard to maintain. Similarly, things might be hard to maintain because you made things overly simple.

👉 **In sum, your task is to migrate data objects into an empty and brand new SQL database. The source data is the `/migration_source_data/models/*.json` file(s).**

#### Data Concept

The way the data is conceptualized is that a `model` (_this is a device_) contains many `configuration`s. And only one of those `configuration`s is our 'production' `configuration`.
The idea behind multiple `configuration`s is they are a way of versioning a `model`'s `configuration` while only ever having one be the __published__ production version.

> You'll notice there's a `.testing { status: 'production' }` property in a `model`'s `.json` that can be used for this.

#### Credentials

You have a cloud-based database server instance running & ready for you. Any connection details not already in your `.env.sample` file will be communicated to you separately. The ask is due to this database naving no tables yet.

# Task 01

Now that you've decided on how you want to store the data, this project needs Postgres SQL functionality added to it. There is none currently.

None of the code to connect to the database is written yet.

👉 **Write the code so this project can connect to the database.**

The [pg](https://www.npmjs.com/package/pg) NPM package is already installed in this project. You can use it to connect to the database if you desire.

> Please consider that we like a modular project structure for readability, reusability, & maintainability. It's a good idea to put the database connection in a reusable module for easy import/export as needed from the project.

# Task 02

👉 **Write some endponts.**

These are urls that will be navigated to and the API must serve them:

- `GET` `http://localhost:5000/api/models`
- `GET` `http://localhost:5000/api/models/:model_id`
- `GET` `http://localhost:5000/api/models/:model_id/configurations`
- `GET` `http://localhost:5000/api/models/:model_id/configurations?published=true`    //  Serves the `production` configuration
- `GET` `http://localhost:5000/api/models/:model_id/configurations/:configuration_id`

# Task 03

This API doesn't currently have any documentation at all.

👉 **Document only ONE of the API endpoints you worked on**

> 👮‍♂️ If you tested your API with PostMan, you can skip this step 🙌 !\
> Simply invite a member of WeAreEnvoy's staff to your PostMan Collection so we can see it. 🚓

_____

Documentation should include:
- Request verb, path, parameters, required headers.
- Response HTTP status codes.

> Don't document error responses.

You can do this in any modern documentation platform you chose that can be shared via a cloud-based link.

Two that we're most familiar with are:
- [Postman](https://www.postman.com/)
- [SwaggerHub](https://swagger.io/tools/swaggerhub/faster-api-design/)

# Some extra direction

### `JSON` field types in SQL

SQL supports `JSON` field types. And while we don't want the `.json` file contents simply saved as one giant blob into a single field value, it is okay to use this field type when you see fit.

On the other hand, something we certainly don't want is to split every single property found in the `.json` file contents into its own field. Find a happy place.

### Constraints
There are no constraints.

Regarding `npm` packages, this project already has what you need to get the job done. However, you are allowed to install more npm packages if you desire.

> A rule-of-thumb, we generally like to keep the amount of installed packages to a minimum for the project to be as light-weight as possible. That being said, if there's a package we haven't thought of that would make your task a lot easier... it might be interesting to see what you do. However you will not gain any points for finding a package and using it, don't feel pressure one way or the other about packages.
