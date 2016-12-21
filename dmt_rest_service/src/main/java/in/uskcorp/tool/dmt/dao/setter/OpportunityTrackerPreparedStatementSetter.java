package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.OpportunityTracker;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.springframework.jdbc.core.PreparedStatementSetter;

public class OpportunityTrackerPreparedStatementSetter implements
		PreparedStatementSetter {
	private OpportunityTracker opportunityTracker;
	private boolean isInsert;

	public OpportunityTrackerPreparedStatementSetter(OpportunityTracker a,
			boolean isInsert) {
		this.opportunityTracker = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, opportunityTracker.getType());
		arg0.setString(2, opportunityTracker.getProvidedBy());
		arg0.setString(3, opportunityTracker.getProvidedFor());
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(opportunityTracker
				.getOpportunityDate()));
		arg0.setString(5, opportunityTracker.getCategory());
		if (!isInsert) {
			arg0.setInt(6, opportunityTracker.getId());
		}
	}
}
