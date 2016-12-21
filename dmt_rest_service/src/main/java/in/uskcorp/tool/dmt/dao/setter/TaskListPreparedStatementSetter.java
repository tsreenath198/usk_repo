	package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.TaskList;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class TaskListPreparedStatementSetter implements PreparedStatementSetter {
	private TaskList taskList;
	private boolean isInsert;

	public TaskListPreparedStatementSetter(TaskList a, boolean isInsert) {
		this.taskList = a;
		this.isInsert = isInsert;
	}

	/*
	 * category, status, assigned_to,estimated_time,created_date,description
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, taskList.getCategory());
		arg0.setString(2, taskList.getStatus());
		arg0.setInt(3, taskList.getAssignedTo());
		arg0.setString(4, taskList.getEstimatedTime());
		arg0.setDate(5,
				ResultSetUtil.converttoSQLDate(taskList.getCreatedDate()));
		arg0.setString(6, taskList.getDescription());

		if (!isInsert) {
			arg0.setInt(7, taskList.getId());
		}

	}
}