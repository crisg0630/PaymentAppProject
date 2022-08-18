import static com.mongodb.client.model.Filters.eq;
import static spark.Spark.*;

import com.google.gson.Gson;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import dao.PaymentDao;
import dao.UserDao;
import dto.PaymentDto;
import dto.UserDto;
import org.bson.Document;

class LoginDto{
  String username;
  String password;
}

class LoginResponseDto{
  Boolean isLoggedIn;
  String error;

  public LoginResponseDto(Boolean isLoggedIn, String error) {
    this.isLoggedIn = isLoggedIn;
    this.error = error;
  }
}

class ResponseDto{
  String message;
  boolean transferSuccess;

  public ResponseDto(String message, boolean transferSuccess){
    this.message = message;
    this.transferSuccess = transferSuccess;
  }
}

public class SparkDemo {

  public static void main(String[] args) {
    port(1234);

    // Instead of using a collection, I'm just using my UserDao instead- Lita
    UserDao users = UserDao.getInstance();  // TODO remove this and use mongo collection instead

    // I'm actually not sure if this code is needed any more because now we have a DAO,
    // but I chose to just leave it alone for now and just modify it to use the
    // one database, two collections model

    // open connection
    MongoClient mongoClient = new MongoClient("localhost", 27017);
    // get ref to database
    MongoDatabase db = mongoClient.getDatabase("FinalProject");
    // get ref to collection
    MongoCollection<Document> usersCollection = db.getCollection("Users");


    Gson gson = new Gson();
    post("/logIn", (req, res) -> {
      String body = req.body();
      LoginDto loginDto = gson.fromJson(body, LoginDto.class);

      Document existingUser = usersCollection.find(eq("username", loginDto.username)).first();  //does filtering on mongo sites
      System.out.println(existingUser);
      if (existingUser != null) {
        if (existingUser.getString("password").equals(loginDto.password)) { //password field is the one submitted
          return gson.toJson(new LoginResponseDto(true, null));
        } else {
          return gson.toJson(new LoginResponseDto(false, "Invalid password"));
        }
      } else {
            var user = new Document()
                .append("username", loginDto.username)
                .append("password", loginDto.password); //encrypted if real
        usersCollection.insertOne(user);

        //Register endpoint
        post("/register", (req, res) -> {
          String body = req.body();
          UserDto userDto = gson.fromJson(body, UserDto.class);
          Document doc = new Document("username", userDto.username)
                  .append("password", userDto.password);
          usersCollection.insertOne(doc);
          return gson.toJson(new LoginResponseDto(true, null));
        });

        /* For now I'm putting code using the UserDao and UserDto in comments just bc I don't want to
           break the working code we have, but once we have completely functional site, we should work on
           transferring the code to using DAOs and DTOs.
           -Lita

           UserDto existingUser = users.get(loginDto.username);
        System.out.println(registeredUser);
        if (existingUser != null) {
          if (existingUser.getPassword().equals(loginDto.password)) { //password field is the one submitted
            return gson.toJson(new LoginResponseDto(true, null));
          } else {
            return gson.toJson(new LoginResponseDto(false, "Invalid password"));
          }
        } else {
          var newUser = new UserDto(loginDto.username, loginDto.password);
          users.put(newUser);

         */


        return gson.toJson(new LoginResponseDto(true, null));
      }
    });

    // Code for cashTransfer
    post("/transfer", (req, res) ->{
      String bodyString = req.body();
      var paymentDto = gson.fromJson(bodyString, PaymentDto.class);

      MongoCollection<Document> paymentCollection = db.getCollection("Payments");

      var payment = new Document("amount", paymentDto.amount)
              .append("type", paymentDto.type)
              .append("to", paymentDto.recipient)
              .append("from", paymentDto.sender)
              .append("note", paymentDto.note);

       Document existingUser = usersCollection.find(eq("username", paymentDto.recipient)).first();

      if(existingUser != null){
        paymentCollection.insertOne(payment);
        var responseDto = new ResponseDto("Transfer Successful", true);
        return gson.toJson(responseDto);
      }
      else{
        var errorDto = new ResponseDto("Recipient Not Found!", false);
        return gson.toJson(errorDto);
      }

    });
  }
}
