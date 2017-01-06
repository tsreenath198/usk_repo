package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.UserRole;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserRoleRowMapper implements RowMapper<UserRole> {
	@Override
	public UserRole mapRow(ResultSet resultSet, int i) throws SQLException {
		UserRole userRole = new UserRole();
		userRole.setId(resultSet.getInt("id"));
		userRole.setName(resultSet.getString("name"));
		userRole.setActiveFlag(resultSet.getInt("active_flag"));
		return userRole;
	}
}
