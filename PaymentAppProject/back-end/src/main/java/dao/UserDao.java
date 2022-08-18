package dao;

import com.mongodb.client.MongoCollection;

import dto.UserDto;
import org.bson.Document;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;
import static dto.UserDto.toDto;

public class UserDao implements BaseDao<UserDto> {
    private static UserDao instance;

    public MongoCollection<Document> collection;
    {
        MongoConnection.getCollection("Users");
    }

    private UserDao(MongoCollection<Document> collection){
        this.collection = collection;
    }

    public static UserDao getInstance() {
        if (instance == null) {
            instance = new UserDao(MongoConnection.getCollection("Users"));
        }
        return instance;
    }

    @Override
    public void put(UserDto userDto) {
        collection.insertOne(userDto.toDocument());
    }


    @Override
    public UserDto get(String username){
       Document search = collection.find(eq("username", username)).first();
       return toDto(search);
    }

    @Override
    public List<UserDto> getAll(){
        ArrayList<Document> entries = collection.find().into(new ArrayList<Document>());
        List<UserDto> users = new ArrayList<>();

        for (Document entry : entries) {
            users.add(toDto(entry));
        }

        return users;
    }

}
