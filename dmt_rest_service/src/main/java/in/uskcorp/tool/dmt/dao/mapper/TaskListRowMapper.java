package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.TaskList;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class TaskListRowMapper implements RowMapper<TaskList> {

	@Override
	public TaskList mapRow(ResultSet resultSet, int i) throws SQLException {
		TaskList taskList = new TaskList();
		taskList.setId(resultSet.getInt("id"));
		taskList.setCategory(resultSet.getString("category"));
		taskList.setTaskDate(ResultSetUtil.getDate(resultSet, "task_date"));
		taskList.setStatus(resultSet.getString("status"));
		taskList.setAssignedTo(resultSet.getInt("assigned_to"));
		taskList.setEstimatedTime(resultSet.getString("estimated_time"));
		taskList.setCreatedDate(ResultSetUtil
				.getDate(resultSet, "created_date"));
		taskList.setUpdatedDate(ResultSetUtil
				.getDate(resultSet, "updated_date"));
		taskList.setDescription(resultSet.getString("description"));

		return taskList;
	}

}
