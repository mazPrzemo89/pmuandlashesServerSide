# pmuandlashesServerSide
An ExpressJS server connected to a MongoDB database responsible for routing and CRUD operations.

## Database 
------
This project is using Mongoose.js for connecting to the db and all the necessary  data manipulation.
Every object saved in the database is a mongoose schema with a unique set of properties.

To run the server localy you need to have MongoDB installed and running on your machine.
Alternatively you can connect to any active MongoDB cluster.
I have included a dummy .env file witch you can adjust to your needs.

### Important:
Before starting the cilent side you must create a Booking Times array witch will be used later by tht client.
Booking Times array needs to be created only once.
You can do that by sending a PUT request to    

http://<YOUR_LOCAL_INSTANCE>/api/bookings/setbookingtimes

it's best to use postman to send that request.

## Admin user
------
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
