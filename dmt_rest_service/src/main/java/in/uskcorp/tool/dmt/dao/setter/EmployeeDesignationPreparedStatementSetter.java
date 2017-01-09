package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.EmployeeDesignation;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class EmployeeDesignationPreparedStatementSetter implements
		PreparedStatementSetter {
	private EmployeeDesignation employeeDesignation;
	private boolean isInsert;

	public EmployeeDesignationPreparedStatementSetter(EmployeeDesignation a,
			boolean isInsert) {
		this.employeeDesignation = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, employeeDesignation.getDesignation());
		arg0.setDate(2, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(3, employeeDesignation.getDescription());
		if (!isInsert) {
			arg0.setInt(4, employeeDesignation.getId());
		}
	}
}
