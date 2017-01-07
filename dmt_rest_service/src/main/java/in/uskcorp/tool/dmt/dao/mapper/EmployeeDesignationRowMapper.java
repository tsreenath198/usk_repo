package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.EmployeeDesignation;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class EmployeeDesignationRowMapper implements
		RowMapper<EmployeeDesignation> {
	@Override
	public EmployeeDesignation mapRow(ResultSet resultSet, int i)
			throws SQLException {
		EmployeeDesignation employeeDesignation = new EmployeeDesignation();
		employeeDesignation.setId(resultSet.getInt("id"));
		employeeDesignation.setDesignation(resultSet.getString("designation"));
		employeeDesignation.setActiveFlag(resultSet.getInt("active_flag"));
		return employeeDesignation;
	}
}
