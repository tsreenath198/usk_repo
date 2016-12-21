package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;

import java.util.List;

public abstract class APIService<T> {

	public List<T> readAll() {
		return getDao().readAll();
	}

	protected abstract APIDAO<T> getDao();

	public T read(Integer id) {
		return getDao().read(id);
	}

	public void create(T a) {
		getDao().create(a);
	}

	public void update(T a) {
		getDao().update(a);
	}

	public void delete(Integer id) {
		getDao().delete(id);
	}
}
