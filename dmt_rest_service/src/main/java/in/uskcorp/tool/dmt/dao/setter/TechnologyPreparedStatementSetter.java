package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Technology;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;


import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class TechnologyPreparedStatementSetter implements
		PreparedStatementSetter {
	private Technology technology;
	private boolean isInsert;

	public TechnologyPreparedStatementSetter(Technology a, boolean isInsert) {
		this.technology = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, technology.getName());
		arg0.setDate(2, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(3, technology.getDescription());
		if (!isInsert) {
			arg0.setInt(4, technology.getId());
		}
	}
}
