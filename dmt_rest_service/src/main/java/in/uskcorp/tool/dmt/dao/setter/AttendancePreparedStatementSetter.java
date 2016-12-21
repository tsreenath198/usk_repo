package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Attendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class AttendancePreparedStatementSetter implements
		PreparedStatementSetter {
	private Attendance attendance;
	private boolean isInsert;

	public AttendancePreparedStatementSetter(Attendance a, boolean isInsert) {
		this.attendance = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setInt(1, attendance.getBatchId());
		arg0.setInt(2, attendance.getTraineeId());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setBoolean(4, attendance.isStatus());
		arg0.setDate(5,
				ResultSetUtil.converttoSQLDate(attendance.getCreatedDate()));

		arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(attendance.getUpdatedDate()));

		if (!isInsert) {
			arg0.setInt(7, attendance.getId());
		}

	}
}
