package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.SupportTracker;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.springframework.jdbc.core.PreparedStatementSetter;

public class SupportTrackerPreparedStatementSetter implements
		PreparedStatementSetter {
	private SupportTracker supportTracker;
	private boolean isInsert;

	public SupportTrackerPreparedStatementSetter(SupportTracker a,
			boolean isInsert) {
		this.supportTracker = a;
		this.isInsert=isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, supportTracker.getSupportBy());
		arg0.setString(2, supportTracker.getSupportTo());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(supportTracker.getDate()));
		arg0.setString(4, supportTracker.getHours());
		arg0.setString(5, supportTracker.getDescription());
		if (!isInsert) {
			arg0.setInt(6, supportTracker.getId());
		} 
	}
}
