package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.SupportInteraction;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class SupportInteractionPreparedStatementSetter implements
		PreparedStatementSetter {

	private SupportInteraction supportInteraction;
	private boolean isInsert;

	public SupportInteractionPreparedStatementSetter(SupportInteraction a,
			boolean isInsert) {
		this.supportInteraction = a;
		this.isInsert = isInsert;
	}

	/*
	 * technology_id,name,est_hrs,created_date,description
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, supportInteraction.getCount());
		arg0.setDate(2, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(3, supportInteraction.getLead());
		arg0.setInt(4, supportInteraction.getLeadId());
		arg0.setInt(5, supportInteraction.getTraineeId());
		arg0.setInt(6, supportInteraction.getEmployeeId());

		// arg0.setInt(6, supportInteraction.getTrainerId());

		arg0.setDate(7, ResultSetUtil.converttoSQLDate(new Date()));

		/*
		 * arg0.setDate(6,
		 * ResultSetUtil.converttoSQLDate(supportInteraction.getCreatedDate()));
		 */
		/*
		 * arg0.setDate( 6,
		 * ResultSetUtil.converttoSQLDate(supportInteraction.getCreatedDate()));
		 */
		arg0.setString(8, supportInteraction.getDescription());

		arg0.setString(9, supportInteraction.getDetails());
		arg0.setInt(10, supportInteraction.getRate());
		arg0.setString(11, supportInteraction.getMonth());
		if (!isInsert) {
			arg0.setInt(12, supportInteraction.getId());
		}
	}
}
