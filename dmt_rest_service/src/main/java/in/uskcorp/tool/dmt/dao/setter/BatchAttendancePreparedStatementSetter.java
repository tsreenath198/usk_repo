package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.BatchAttendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class BatchAttendancePreparedStatementSetter implements
		PreparedStatementSetter {
	private BatchAttendance batchAttendance;
	private boolean isInsert;

	public BatchAttendancePreparedStatementSetter(BatchAttendance a,
			boolean isInsert) {
		this.batchAttendance = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setInt(1, batchAttendance.getBatchId());
		arg0.setDate(2, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setInt(3, batchAttendance.getTraineeId());
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(5, batchAttendance.getDescription());
		if (!isInsert) {
			arg0.setInt(6, batchAttendance.getId());
		}

	}
}
