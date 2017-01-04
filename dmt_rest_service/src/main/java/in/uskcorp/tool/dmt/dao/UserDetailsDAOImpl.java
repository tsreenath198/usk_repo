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
	public UserDetails readByValues(String username, String password) {
		return getJdbcTemplate().queryForObject(SQLConstants.USERCREDS_SELECT,
				new Object[] { username, password }, getRowMapper(false));
	}

}
