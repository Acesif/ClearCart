package com.asif.server.base;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.Date;

public abstract class BaseService<T extends BaseEntity> {

    protected final BaseRepository<T> baseRepository;

    public BaseService(BaseRepository<T> baseRepository) {
        this.baseRepository = baseRepository;
    }

    public T findById(Long id) {
        return baseRepository.findById(id).orElse(null);
    }

    public Page<T> findAll(int page, int limit) {
        return baseRepository.findAll(PageRequest.of(page, limit));
    }

    public Page<T> findAll(int page, int limit, Sort.Direction direction, String... properties) {
        return baseRepository.findAll(PageRequest.of(page, limit, direction, properties));
    }
    public void deleteAll(){
        baseRepository.deleteAll();
    }

    public T save(T entity) {
        entity.setCreateDate(new Date());
        entity.setFlag(true);
        return baseRepository.saveAndFlush(entity);
    }

    public T update(T entity) {
        entity.setUpdateDate(new Date());
        return baseRepository.save(entity);
    }

    public T delete(Long id) {
        T entity = baseRepository.findById(id).orElse(null);
        if (entity != null) {
            entity.setFlag(false);
            return update(entity);
        } else {
            return null;
        }
    }

    public void hardDelete(Long id) {
        baseRepository.deleteById(id);
    }
}
