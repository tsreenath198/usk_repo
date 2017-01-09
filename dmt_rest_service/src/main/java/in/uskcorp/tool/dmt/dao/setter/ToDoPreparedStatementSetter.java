	package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.ToDo;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class ToDoPreparedStatementSetter implements PreparedStatementSetter {
	private ToDo toDo;
	private boolean isInsert;

	public ToDoPreparedStatementSetter(ToDo a, boolean isInsert) {
		this.toDo = a;
		this.isInsert = isInsert;
	}

	/*
	 * category, status, assigned_to,estimated_time,created_date,description
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, toDo.getCategory());
		arg0.setDate(2, ResultSetUtil.converttoSQLDate(toDo.getTaskDate()));
		arg0.setString(3, toDo.getStatus());	
		arg0.setInt(4, toDo.getAssignedTo());
		arg0.setString(5, toDo.getEstimatedTime());
		arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, toDo.getDescription());

		if (!isInsert) {
			arg0.setInt(8, toDo.getId());
		}

	}
}