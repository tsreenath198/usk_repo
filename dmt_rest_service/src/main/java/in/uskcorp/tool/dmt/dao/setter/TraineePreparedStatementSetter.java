package in.uskcorp.tool.dmt.dao.setter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

public class TraineePreparedStatementSetter implements PreparedStatementSetter {
	private Trainee trainee;
	private boolean isInsert;

	public TraineePreparedStatementSetter(Trainee a, boolean isInsert) {
		this.trainee = a;
		this.isInsert = isInsert;
	}

	/*
	 * name,
	 * email,alternate_phone,client_id,skype_id,timezone,batch_id,created_date,"
	 * + "description,phone,trainee_fee_status,paid_status,received_status,
	 * technology_id
	 */
	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, trainee.getName());
		arg0.setString(2, trainee.getEmail());
		arg0.setString(3, trainee.getAlternatePhone());
		arg0.setInt(4, trainee.getClientId());
		arg0.setString(5, trainee.getSkypeId());
		arg0.setString(6, trainee.getTimezone());
		arg0.setInt(7, trainee.getBatchId());
		arg0.setDate(8, ResultSetUtil.converttoSQLDate(new Date()));

		arg0.setString(9, trainee.getDescription());
		arg0.setString(10, trainee.getPhone());
		arg0.setString(11, trainee.getTraineeFeeStatus());
		arg0.setString(12, trainee.getPaidStatus());
		arg0.setString(13, trainee.getReceivedStatus());
		arg0.setInt(14, trainee.getTechnologyId());
		//arg0.setDate(15, ResultSetUtil.converttoSQLDate(new Date()));

		if (!isInsert) {
			arg0.setInt(15, trainee.getId());
		}

	}
}
