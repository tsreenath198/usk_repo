package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.UserDetails;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class UserDetailsPreparedStatementSetter implements
		PreparedStatementSetter {

	private UserDetails userCredentials;
	private boolean isInsert;

	public UserDetailsPreparedStatementSetter(UserDetails a, boolean isInsert) {
		this.userCredentials = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {

		arg0.setString(1, userCredentials.getUserName());
		arg0.setString(2, userCredentials.getFirstName());
		arg0.setString(3, userCredentials.getLastName());
		arg0.setString(4, userCredentials.getEmail());
		arg0.setString(5, userCredentials.getPhoneNo());
		arg0.setString(6, userCredentials.getPassword());
		arg0.setString(7, userCredentials.getRole());
		arg0.setString(8, userCredentials.getDescription());

		if (!isInsert) {
			arg0.setInt(9, userCredentials.getId());
		}

	}
}
