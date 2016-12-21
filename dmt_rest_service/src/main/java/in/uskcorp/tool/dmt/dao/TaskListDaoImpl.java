package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.TaskListRowMapper;
import in.uskcorp.tool.dmt.dao.setter.TaskListPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.TaskList;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("taskListDaoImpl")
public class TaskListDaoImpl extends TaskListDAO {

	@Override
	protected RowMapper<TaskList> getRowMapper(Boolean isReadAll) {
		return new TaskListRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.TASKSSELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TASK_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TASK_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TASK_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TASK_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(TaskList a,
			boolean isInsert) {
		return new TaskListPreparedStatementSetter(a, isInsert);
	}
}
