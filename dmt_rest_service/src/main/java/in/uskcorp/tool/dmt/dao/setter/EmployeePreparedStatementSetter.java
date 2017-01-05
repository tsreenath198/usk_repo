package in.uskcorp.tool.dmt.dao.setter;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

import in.uskcorp.tool.dmt.domain.Employee;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

public class EmployeePreparedStatementSetter implements PreparedStatementSetter {
	private Employee employee;
	private boolean isInsert;

	public EmployeePreparedStatementSetter(Employee a, boolean isInsert) {
		this.employee = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, employee.getName());
		arg0.setString(2, employee.getPhone());
		arg0.setString(3, employee.getEmail());
		arg0.setString(4, employee.getRole());
		arg0.setFloat(5, employee.getBaseSalary());
		arg0.setDate(6,ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, employee.getDescription());
		if (!isInsert) {
			arg0.setInt(8, employee.getId());
		}

	}
}
