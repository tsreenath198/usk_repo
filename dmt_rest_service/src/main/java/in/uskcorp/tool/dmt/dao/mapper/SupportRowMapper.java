package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Support;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class SupportRowMapper implements RowMapper<Support> {
	private Boolean isReadAll;

	public SupportRowMapper(boolean isReadAll) {
		this.isReadAll = isReadAll;
	}

	@Override
	public Support mapRow(ResultSet resultSet, int i) throws SQLException {
		Support support = new Support();
		support.setId(resultSet.getInt("id"));
		support.setTraineeId(resultSet.getInt("trainee_id"));
		support.setSupportedBy(resultSet.getInt("supported_by"));
		support.setTrainerId(resultSet.getInt("trainer_id"));
		support.setStartDate(ResultSetUtil.getDate(resultSet, "start_date"));
		support.setEndDate(ResultSetUtil.getDate(resultSet, "end_date"));
		support.setAllottedTime(resultSet.getString("allotted_time"));
		support.setEndClient(resultSet.getString("end_client"));
		support.setStatus(resultSet.getString("status"));
		support.setPaidStatus(resultSet.getString("paid_status"));
		support.setReceivedStatus(resultSet.getString("received_status"));
		support.setTechnologyUsed(resultSet.getString("technology_used"));
		support.setPaidBy(resultSet.getString("paid_by"));
		support.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		support.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		support.setDescription(resultSet.getString("description"));

		if (isReadAll) {
			support.setTraineeName(resultSet.getString("trainee_name"));
			support.setEmployeeName(resultSet.getString("employee_name"));
		}

		return support;
	}

}
