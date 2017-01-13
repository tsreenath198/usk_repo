package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.BatchAttendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class BatchAttendancePreparedStatementSetter implements PreparedStatementSetter {
	private BatchAttendance batchAttendance;
	private boolean isInsert;

	public BatchAttendancePreparedStatementSetter(BatchAttendance a,
			boolean isInsert) {
		this.batchAttendance = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setInt(2, batchAttendance.getId());
		//arg0.setString(2, batchAttendance.getName());
		arg0.setInt(1, batchAttendance.getBatchId());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(batchAttendance.getDate()));
		arg0.setInt(4, batchAttendance.getTraineeId());
		arg0.setDate(5, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(6, batchAttendance.getDescription());
		if (!isInsert) {
			arg0.setInt(7, batchAttendance.getId());
		}

	}
}
