package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Support;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class SupportPreparedStatementSetter implements PreparedStatementSetter {
	private Support support;
	private boolean isInsert;

	public SupportPreparedStatementSetter(Support a, boolean isInsert) {
		this.support = a;
		this.isInsert = isInsert;
	}

	/*
	 * trainee_id=?,supported_by=?,trainer_id=?,start_date=?,end_date=?,
	 * allotted_time
	 * =?,end_client=?,status=?,paid_status=?,received_status=?,technology_used
	 * =?,paid_by=?,updated_date=?,description=? WHERE id = ?
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, support.getTraineeId());
		// arg0.setInt(2, support.getSupportedBy());
		arg0.setInt(2, support.getTrainerId());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(support.getStartDate()));
		arg0.setDate(4, ResultSetUtil.converttoSQLDate(support.getEndDate()));
		arg0.setString(5, support.getAllottedTime());
		arg0.setString(6, support.getEndClient());
		arg0.setString(7, support.getStatus());
		arg0.setString(8, support.getPaidStatus());
		arg0.setString(9, support.getReceivedStatus());
		arg0.setString(10, support.getTechnologyUsed());
		arg0.setDate(11, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(12, support.getDescription());
		arg0.setString(13, support.getPaidBy());
		arg0.setInt(14, support.getNumberOfInteractions());
		arg0.setString(15, support.getInvoice());
		if (!isInsert) {
			arg0.setInt(16, support.getId());
		}

	}
}