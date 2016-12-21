package in.uskcorp.tool.dmt.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;

public abstract class APIDAO<T> {

	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	protected abstract RowMapper<T> getRowMapper(Boolean b);

	protected abstract String getReadAllQuery();

	protected abstract String getReadQuery();

	protected abstract String getInsertQuery();

	protected abstract String getUpdateQuery();

	protected abstract String getDeleteQuery();

	protected abstract PreparedStatementSetter getPreparedStatementSetter(T a,
			boolean isInsert);

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public List<T> readAll() {
		return jdbcTemplate.query(getReadAllQuery(), getRowMapper(true));
	}

	public T read(Integer id) {
		return jdbcTemplate.queryForObject(getReadQuery(), new Object[] { id },
				getRowMapper(false));
	}

	public void create(T a) {
		jdbcTemplate.update(getInsertQuery(),
				getPreparedStatementSetter(a, true));
	}

	public void update(T a) {
		jdbcTemplate.update(getUpdateQuery(),
				getPreparedStatementSetter(a, false));
	}

	public void delete(Integer id) {
		jdbcTemplate.update(getDeleteQuery(), id);
	}
}
