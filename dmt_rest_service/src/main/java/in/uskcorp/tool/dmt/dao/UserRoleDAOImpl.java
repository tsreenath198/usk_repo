package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.UserRoleRowMapper;
import in.uskcorp.tool.dmt.dao.setter.UserRolePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.UserRole;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("userRoleDaoImpl")
public class UserRoleDAOImpl extends UserRoleDAO {
	@Override
	protected RowMapper<UserRole> getRowMapper(Boolean isReadAll) {
		return new UserRoleRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.USER_ROLE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.USER_ROLE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.USER_ROLE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.USER_ROLE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.USER_ROLE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(UserRole a,
			boolean isInsert) {
		return new UserRolePreparedStatementSetter(a, isInsert);
	}
}
