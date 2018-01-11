package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.MiscellaneousRowMapper;
import in.uskcorp.tool.dmt.dao.setter.MiscellaneousPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Miscellaneous;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("miscellaneousDaoImpl")
public class MiscellaneousDAOImpl extends MiscellaneousDAO {

	@Override
	protected RowMapper<Miscellaneous> getRowMapper(Boolean isReadAll) {
		return new MiscellaneousRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.MISCELLANEOUS_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.MISCELLANEOUS_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.MISCELLANEOUS_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.MISCELLANEOUS_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.MISCELLANEOUS_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			Miscellaneous a, boolean isInsert) {
		return new MiscellaneousPreparedStatementSetter(a, isInsert);
	}

}
