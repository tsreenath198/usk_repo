package in.uskcorp.tool.dmt.dao.setter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

import in.uskcorp.tool.dmt.domain.Salary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

public class SalaryPreparedStatementSetter implements PreparedStatementSetter {
	private Salary salary;
	private boolean isInsert;

	public SalaryPreparedStatementSetter(Salary a, boolean isInsert) {
		this.salary = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, salary.getEmployeeId());
		arg0.setString(2, salary.getMonth());
		arg0.setString(3, salary.getYear());
		arg0.setFloat(4, salary.getSalary());
		arg0.setDate(5,ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(6, salary.getDescription());
		if (!isInsert) {
			arg0.setInt(7, salary.getId());
		}

	}
}
