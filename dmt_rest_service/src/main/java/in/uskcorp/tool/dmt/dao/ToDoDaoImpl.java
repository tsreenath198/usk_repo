package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.ToDoRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ToDoPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.ToDo;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("toDoDaoImpl")
public class ToDoDaoImpl extends ToDoDAO {

	@Override
	protected RowMapper<ToDo> getRowMapper(Boolean isReadAll) {
		return new ToDoRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.TODOSELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TODO_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TODO_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TODO_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TODO_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(ToDo a,
			boolean isInsert) {
		return new ToDoPreparedStatementSetter(a, isInsert);
	}
}
