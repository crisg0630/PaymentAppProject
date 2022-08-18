package dao;

import com.mongodb.client.MongoCollection;
import static com.mongodb.client.model.Filters.*;
import static dto.PaymentDto.toDto;
import dto.PaymentDto;
import java.util.*;
import java.util.stream.Collectors;
import org.bson.Document;
import org.bson.types.ObjectId;


public class PaymentDao implements BaseDao<PaymentDto> {

    private static PaymentDao instance;
    public MongoCollection<Document> collection;

    {
        MongoConnection.getCollection("Payments");
    }

    private PaymentDao(MongoCollection<Document> collection) {
        this.collection = collection;
    }

    public static PaymentDao getInstance() {
        if (instance == null) {
            instance = new PaymentDao(MongoConnection.getCollection("Payments"));
        }
        return instance;
    }

    public static PaymentDao getInstance(MongoCollection<Document> collection) {
        instance = new PaymentDao(collection);
        return instance;
    }

    @Override
    public void put(PaymentDto PaymentDto) {
        collection.insertOne(PaymentDto.toDocument());
    }

    @Override
    public PaymentDto get(String id) {
        Document search = collection.find(eq("_id", id)).first();
        return toDto(search);
    }

    @Override
    public List<PaymentDto> getAll() {
        ArrayList<Document> entries = collection.find().into(new ArrayList<Document>());
        List<PaymentDto> payments = new ArrayList<>();
        for (int i = 0; i < payments.size(); i++)
            for (Document entry : entries) {
                payments.add(toDto(entry));
            }

            return payments;
        }
    }


