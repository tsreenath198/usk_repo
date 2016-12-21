package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Employee;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class EmployeeRowMapper implements RowMapper<Employee> {

	@Override
	public Employee mapRow(ResultSet resultSet, int i) throws SQLException {
		Employee employee = new Employee();
		employee.setId(resultSet.getInt("id"));
		employee.setName(resultSet.getString("name"));
		employee.setPhone(resultSet.getString("phone"));
		employee.setEmail(resultSet.getString("email"));
		employee.setRole(resultSet.getString("role"));
		employee.setBaseSalary(resultSet.getFloat("base_salary"));
		employee.setCreatedDate(ResultSetUtil
				.getDate(resultSet, "created_date"));
		employee.setDescription(resultSet.getString("description"));
		employee.setActiveFlag(resultSet.getInt("active_flag"));
		return employee;
	}
}
