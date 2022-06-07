# MyMoney

This is a simple application to manage your money. For this, it allows the recording of payments and receipts, in addition, credit and debit totals are accounted for.

To run an application, follow these steps:
#### 1) Installing dependencies
- In the /frontend and /backend directories run the command: `yarn install`.

#### 2) Environment variables
- In the /backend directory create a **.env** file according to the example available in **.env.example**;
- In the /frontend directory, create a file **.env.development.local** according to the example available in **.env.development.local.example**.

#### 3) Running the application
 - In the /backend directory run the command: `docker-compose -p my-money up -d`