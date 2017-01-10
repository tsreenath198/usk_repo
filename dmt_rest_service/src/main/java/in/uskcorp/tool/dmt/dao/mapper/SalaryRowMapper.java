package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Salary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class SalaryRowMapper implements RowMapper<Salary> {

	@Override
	public Salary mapRow(ResultSet resultSet, int i) throws SQLException {
		Salary salary = new Salary();
		salary.setId(resultSet.getInt("id"));
		salary.setEmployeeId(resultSet.getString("employee_id"));
		salary.setMonth(resultSet.getString("month"));
		salary.setYear(resultSet.getString("year"));
		salary.setSalary(resultSet.getFloat("salary"));
		salary.setCreatedDate(ResultSetUtil
				.getDate(resultSet, "created_date"));
		salary.setUpdatedDate(ResultSetUtil
				.getDate(resultSet, "updated_date"));
		salary.setDescription(resultSet.getString("description"));
		salary.setActiveFlag(resultSet.getInt("active_flag"));
		return salary;
	}
}
