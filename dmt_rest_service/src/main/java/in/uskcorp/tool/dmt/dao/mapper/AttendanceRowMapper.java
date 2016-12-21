package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Attendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class AttendanceRowMapper implements RowMapper<Attendance> {

	@Override
	public Attendance mapRow(ResultSet resultSet, int i) throws SQLException {
		Attendance attendance = new Attendance();
		attendance.setId(resultSet.getInt("id"));
		attendance.setBatchId(resultSet.getInt("batch_id"));
		attendance.setTraineeId(resultSet.getInt("trainee_id"));
		attendance.setDate(ResultSetUtil.getDate(resultSet, "date"));
		attendance.setStatus(resultSet.getBoolean("status"));
		attendance.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		attendance.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		return attendance;
	}
}
