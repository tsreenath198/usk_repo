package in.uskcorp.tool.dmt.dao.setter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

import in.uskcorp.tool.dmt.domain.TimeSheet;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

public class TimeSheetPreparedStatementSetter implements
		PreparedStatementSetter {
	private TimeSheet timeSheet;
	private boolean isInsert;

	public TimeSheetPreparedStatementSetter(TimeSheet a, boolean isInsert) {
		this.timeSheet = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setDate(1, ResultSetUtil.converttoSQLDate(timeSheet.getDate()));
		arg0.setInt(2, timeSheet.getEmployeeId());
		arg0.setString(3, timeSheet.getCategory());
		arg0.setInt(4, timeSheet.getCategoryRefNo());
		arg0.setFloat(5, timeSheet.getDurationInHours());
		arg0.setDate(6, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, timeSheet.getDescription());
		if (!isInsert) {
			arg0.setInt(8, timeSheet.getId());
		}
	}
}
