package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Interview;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class InterviewRowMapper implements RowMapper<Interview> {

	@Override
	public Interview mapRow(ResultSet resultSet, int i) throws SQLException {
		Interview interview = new Interview();
		interview.setId(resultSet.getInt("id"));
		interview.setTraineeId(resultSet.getInt("trainee_id"));
		interview.setAssistedBy(resultSet.getInt("assisted_by"));
		interview.setClientId(resultSet.getInt("client_id"));
		interview.setInterviewer(resultSet.getString("interviewer"));
		interview.setTime(resultSet.getString("time"));
		interview.setStatus(resultSet.getString("status"));
		interview.setPaidStatus(resultSet.getString("paid_status"));
		interview.setReceivedStatus(resultSet.getString("received_status"));
		interview.setCreatedDate(resultSet.getDate("created_date"));
		interview.setUpdatedDate(resultSet.getDate("updated_date"));
		interview.setDescription(resultSet.getString("description"));
		interview.setDate(resultSet.getDate("date"));
		return interview;
	}

}
