package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Trainer;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class TrainerPreparedStatementSetter implements PreparedStatementSetter {
	private Trainer trainer;
	private boolean isInsert;

	public TrainerPreparedStatementSetter(Trainer a, boolean isInsert) {
		this.trainer = a;
		this.isInsert = isInsert;
	}

	/* name,referred_by, technology_id,phone,email,created_date,description */
	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, trainer.getName());
		arg0.setString(2, trainer.getReferredBy());
		arg0.setInt(3, trainer.getTechnologyId());
		arg0.setString(4, trainer.getPhone());
		arg0.setString(5, trainer.getEmail());
		arg0.setDate(6,
				ResultSetUtil.converttoSQLDate(new Date()));

		arg0.setString(7, trainer.getDescription());

		if (!isInsert) {
			arg0.setInt(8, trainer.getId());
		}

	}
}
