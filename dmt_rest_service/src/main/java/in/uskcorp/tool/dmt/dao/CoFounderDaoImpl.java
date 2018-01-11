package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.CoFounder;

import in.uskcorp.tool.dmt.dao.mapper.CoFounderRowMapper;
import in.uskcorp.tool.dmt.dao.setter.CoFounderPreparedStatementSetter;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("coFounderDaoImpl")
public class CoFounderDaoImpl extends CoFounderDAO {

	@Override
	protected RowMapper<CoFounder> getRowMapper(Boolean isReadAll) {
		return new CoFounderRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.COFOUNDER_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.COFOUNDER_SELECT_BY_NAME;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.COFOUNDER_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.COFOUNDER_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.COFOUNDER_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(CoFounder a,
			boolean isInsert) {
		return new CoFounderPreparedStatementSetter(a, isInsert);
	}

}
