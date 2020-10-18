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
Booking Times arrry needs to be created only once.
You can do that by sending a PUT request to    

http://<YOUR_INSTANCE_OF_THE_SERVER>/api/bookings/setbookingtimes

it's best to use postman to send that request.
