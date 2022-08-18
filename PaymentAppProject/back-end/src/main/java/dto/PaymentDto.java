package dto;

import org.bson.Document;

public class PaymentDto{
    public Double amount;

    public String type;
    public String note;
    public String sender;
    public String recipient;

    public PaymentDto() {
    }

    public PaymentDto(String sender, String recipient, Double amount, String type, String note) {
        this.sender = sender;
        this.recipient = recipient;
        this.amount = amount;
        this.note = note;
        this.note = "";
    }

    public Document toDocument() {
        return new Document("amount", amount)
                .append("type", type)
                .append("to", recipient)
                .append("from", sender)
                .append("note", note);
    }

    public static PaymentDto toDto(Document document){
        return new PaymentDto(document.getString("to"), document.getString("from"), document.getDouble("amount"), document.getString("type"), document.getString("note"));
    }
}