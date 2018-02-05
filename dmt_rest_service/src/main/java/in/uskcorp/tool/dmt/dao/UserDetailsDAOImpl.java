package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.UserDetailsRowMapper;
import in.uskcorp.tool.dmt.dao.setter.UserDetailsPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.UserDetails;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("userDetailsDaoImpl")
public class UserDetailsDAOImpl extends UserDetailsDAO {

	@Override
	protected RowMapper<UserDetails> getRowMapper(Boolean isReadAll) {
		return new UserDetailsRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.USER_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.USER_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.USER_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.USER_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.USER_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(UserDetails a,
			boolean isInsert) {
		return new UserDetailsPreparedStatementSetter(a, isInsert);
	}

	@Override
	public boolean readByValues(UserDetails userDetails) {
		boolean userExists = false;
		int rowcount = getJdbcTemplate().queryForInt(
				SQLConstants.USERCREDS_SELECT, userDetails.getUserName(),
				userDetails.getPassword());

		/*
		 * int rowcount = getJdbcTemplate().queryForInt(
		 * SQLConstants.USERCREDS_SELECT, username, password,
		 * getRowMapper(false));
		 */
		if (rowcount == 1) {
			userExists = true;
		}
		return userExists;
	}
}
