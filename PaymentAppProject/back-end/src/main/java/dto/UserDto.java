package dto;

import org.bson.Document;

public class UserDto {
    private String username;
    private String password;

    public UserDto(){}

    public UserDto(String username, String password){
        this.username = username;
        this.password = password;
    }

    public String getUsername(){
        return username;
    }

    public String getPassword(){
        return password;
    }

    public void setUsername(String username){
        this.username = username;
    }

    public void setPassword(String password){
        this.password = password;
    }


    public Document toDocument(){
        return new Document("username", username)
                .append("password", password);
    }

    public static UserDto toDto(Document document){
        return new UserDto(document.getString(("username")), document.getString(("password")));
    }


}
