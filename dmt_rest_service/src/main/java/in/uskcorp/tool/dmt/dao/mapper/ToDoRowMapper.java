package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.ToDo;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ToDoRowMapper implements RowMapper<ToDo> {

	@Override
	public ToDo mapRow(ResultSet resultSet, int i) throws SQLException {
		ToDo toDo = new ToDo();
		toDo.setId(resultSet.getInt("id"));
		toDo.setCategory(resultSet.getString("category"));
		toDo.setTaskDate(ResultSetUtil.getDate(resultSet, "task_date"));
		toDo.setStatus(resultSet.getString("status"));
		toDo.setAssignedTo(resultSet.getInt("assigned_to"));
		toDo.setEstimatedTime(resultSet.getString("estimated_time"));
		toDo.setCreatedDate(ResultSetUtil
				.getDate(resultSet, "created_date"));
		toDo.setUpdatedDate(ResultSetUtil
				.getDate(resultSet, "updated_date"));
		toDo.setDescription(resultSet.getString("description"));

		return toDo;
	}

}
