package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.UserDetails;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class UserDetailsRowMapper implements RowMapper<UserDetails> {

	@Override
	public UserDetails mapRow(ResultSet resultSet, int i)
			throws SQLException {
		UserDetails userDetails = new UserDetails();
		userDetails.setId(resultSet.getInt("id"));
		userDetails.setUserName(resultSet.getString("username"));
		userDetails.setFirstName(resultSet.getString("firstname"));
		userDetails.setLastName(resultSet.getString("lastname"));
		userDetails.setEmail(resultSet.getString("email"));
		userDetails.setPhoneNo(resultSet.getString("phoneno"));
		userDetails.setPassword(resultSet.getString("password"));
		userDetails.setRole(resultSet.getString("role"));
		userDetails.setDescription(resultSet.getString("description"));
		return userDetails;
	}

}
