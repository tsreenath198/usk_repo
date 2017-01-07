package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.BatchAttendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class BatchAttendanceRowMapper implements RowMapper<BatchAttendance> {

	@Override
	public BatchAttendance mapRow(ResultSet resultSet, int i)
			throws SQLException {
		BatchAttendance batchAttendance = new BatchAttendance();
		batchAttendance.setId(resultSet.getInt("id"));
		batchAttendance.setBatchId(resultSet.getInt("batch_id"));
		batchAttendance.setDate(ResultSetUtil.getDate(resultSet, "date"));
		batchAttendance.setTraineeId(resultSet.getInt("trainee_id"));
		batchAttendance.setCreatedDate(ResultSetUtil.getDate(resultSet,
				"created_date"));
		batchAttendance.setUpdatedDate(ResultSetUtil.getDate(resultSet,
				"updated_date"));
		batchAttendance.setDescription(resultSet.getString("description"));
		batchAttendance.setActiveFlag(resultSet.getInt("active_flag"));
		return batchAttendance;
	}
}
