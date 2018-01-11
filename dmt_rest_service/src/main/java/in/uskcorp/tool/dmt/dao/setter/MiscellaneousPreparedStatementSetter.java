package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Miscellaneous;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class MiscellaneousPreparedStatementSetter implements
		PreparedStatementSetter {
	private Miscellaneous miscellaneous;
	private boolean isInsert;

	public MiscellaneousPreparedStatementSetter(Miscellaneous a,
			boolean isInsert) {
		this.miscellaneous = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setInt(1, miscellaneous.getEmployeeId());

		arg0.setString(2, miscellaneous.getDetails());
		arg0.setInt(3, miscellaneous.getCount());
		arg0.setInt(4, miscellaneous.getRate());
		arg0.setDate(5, miscellaneous.getDate());
		arg0.setDate(6, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, miscellaneous.getDescription());

		if (!isInsert) {
			arg0.setInt(8, miscellaneous.getId());
		}

	}

}
