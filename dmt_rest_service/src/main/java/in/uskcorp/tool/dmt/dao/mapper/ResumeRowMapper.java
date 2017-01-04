package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Resume;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ResumeRowMapper implements RowMapper<Resume> {

	@Override
	public Resume mapRow(ResultSet resultSet, int i) throws SQLException {
		Resume resume = new Resume();
		
		resume.setId(resultSet.getInt("id"));
	//	resume.setTraineeName(resultSet.getString("traineeName"));
		resume.setTraineeId(resultSet.getInt("trainee_Id"));
		resume.setPreparedBy(resultSet.getString("prepared_By"));
		resume.setPaid(resultSet.getString("paid"));
		resume.setDate(ResultSetUtil.getDate(resultSet, "date"));
		resume.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		resume.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		resume.setReceivedStatus(resultSet.getString("received_status"));
		resume.setDescription(resultSet.getString("description"));
		
		return resume;
	}

}
