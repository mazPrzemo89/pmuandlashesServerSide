# pmuandlashesServerSide
An ExpressJS server responsible for routing and CRUD operations.

## Database 

This project is using Mongoose.js for MongoDB database connection and all the necessary  data manipulation.
Every object saved in the database is a mongoose schema with a unique set of properties.

To run the server localy you need to have MongoDB installed and running on your machine.
Alternatively you can connect to any online MongoDB cluster.

I have included a dummy .env file witch you can adjust to your needs.
It contains ``` STRIPE_SECRET_KEY ``` and ``` SMS_TOKEN ``` with are needed do connect to according third party services.
In this case is Stripe and TheSMSWorks if you want to get the full functionality of this app you have register to these or similar services. 

## Instalation
Run ``` npm install ``` command from projects root directory to install all the neccessary dependencies.


## Admin user

To create an admin user send a POST request to 

http://<YOUR_LOCAL_INSTANCE>/api/signup

with a JSON body that follows the pattern bellow
```
{
	"name":"YOUR_NAME",
	"email":"example@email.com",
	"password": "YOUR_PASSWORD"
}
```
After the user is successfully created and saved to your database it will have a role property with value of 0  
in order to give that user admin privileges you need to manually change that value to 1.


# Deployment

After your production build is sitting in the servers root directory you gonna have to adjust the app.js file a little bit.
First remove  ``` api ``` form every app.use call in the file.


``` app.use('/api', authRoutes) ``` ->  ``` app.use('/', authRoutes)  ```

then append this snnipet after the app.use calls
```
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

```

Now you can run the app from any previously configured VPS
preferably use Nginx but Apache will do as well if you know your way around it.

Run the app using tmux or 2pm.js to run the proccess in the background.

# Features to implement
Adjusting Client side to not require hard coded bookings array.
