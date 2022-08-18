package dao;


import java.util.List;

public interface BaseDao<T> {

    public void put(T t);

    public T get(String id);

   public List<T> getAll();

}
