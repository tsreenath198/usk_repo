package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Employee;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import org.springframework.jdbc.core.PreparedStatementSetter;

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
		arg0.setDate(6,ResultSetUtil.converttoSQLDate(employee.getCreatedDate()));
		arg0.setString(7, employee.getDescription());
		if (!isInsert) {
			arg0.setInt(8, employee.getId());
		}

	}
}
