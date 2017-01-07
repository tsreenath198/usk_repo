package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.EmployeeAttendance;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class EmployeeAttendanceRowMapper implements
		RowMapper<EmployeeAttendance> {

	@Override
	public EmployeeAttendance mapRow(ResultSet resultSet, int i)
			throws SQLException {
		EmployeeAttendance employeeAttendence = new EmployeeAttendance();
		employeeAttendence.setId(resultSet.getInt("id"));
		employeeAttendence.setEmployeeId(resultSet.getInt("employee_id"));
		employeeAttendence
				.setEmployeeName(resultSet.getString("employee_name"));
		employeeAttendence.setDateOfAttendence(resultSet.getDate("date"));
		employeeAttendence.setCreatedDate(resultSet.getDate("created_date"));
		employeeAttendence.setUpdatedDate(resultSet.getDate("updated_date"));
		employeeAttendence.setInTime(resultSet.getString("in_time"));
		employeeAttendence.setOutTime(resultSet.getString("out_time"));
		return employeeAttendence;
	}
}
