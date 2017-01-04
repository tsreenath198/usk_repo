package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Interview;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class InterviewPreparedStatementSetter implements
		PreparedStatementSetter {
	private Interview interview;
	private boolean isInsert;

	public InterviewPreparedStatementSetter(Interview a, boolean isInsert) {
		this.interview = a;
		this.isInsert = isInsert;
	}

	/*
	 * trainee_id, assisted_by, client_id, interviewer, time, status,
	 * created_date,paid_status,received_status, description, date
	 */

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, interview.getTraineeId());
		arg0.setInt(2, interview.getAssistedBy());
		arg0.setInt(3, interview.getClientId());
		arg0.setString(4, interview.getInterviewer());
		arg0.setString(5, interview.getTime());
		arg0.setString(6, interview.getStatus());
		arg0.setDate(7,
				ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(8, interview.getPaidStatus());
		arg0.setString(9, interview.getReceivedStatus());
		arg0.setString(10, interview.getDescription());
		arg0.setDate(11, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(10, interview.getTechnology());
		if (!isInsert) {
			arg0.setInt(12, interview.getId());
		}

	}
}