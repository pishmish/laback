The server is running on port 5001.

## Setting up the project on your computer:

This guide is tailored for internal use by the team. To start the backend server, follow the steps below:

1. Clone the repository

2. If you don't have NodeJS installed yet, go ahead and install it.

3. If you don't have npm yet, go ahead and install it.

4. Install the dependencies by running `npm install`

5. To start the server, run `npm run dev`, CTRL + C to stop the server.

## Setting up the database on MySQL:

1. You need to have MySQL installed and running on your computer.

2. head to the terminal and navigate to `./laback/DB`

3. Run the following command to create the tables: `mysql -u root -p < setup.sql`

4. Run the following command to populate the tables: `mysql -u root -p < sampleData.sql`

5. Run the following command to drop to database and reset everything: `mysql -u root -p < reset.sql`
