package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.CoFounder;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class CoFounderPreparedStatementSetter implements
		PreparedStatementSetter {

	private boolean isInsert;
	private CoFounder coFounder;

	public CoFounderPreparedStatementSetter(CoFounder a, boolean isInsert) {
		this.coFounder = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, coFounder.getName());
		arg0.setString(2, coFounder.getEmail());
		arg0.setString(3, coFounder.getAddress());
		arg0.setString(4, coFounder.getDob());

		if (!isInsert) {
			System.out.println("not inserted------------");
			arg0.setInt(5, coFounder.getId());
		}

	}
}
