package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.UserRole;

import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class UserRolePreparedStatementSetter implements PreparedStatementSetter {
	private UserRole userRole;
	private boolean isInsert;

	public UserRolePreparedStatementSetter(UserRole a, boolean isInsert) {
		this.userRole = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, userRole.getName());
		if (!isInsert) {
			arg0.setInt(2, userRole.getId());
		}
	}
}
