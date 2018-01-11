package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.SupportInteractionRowMapper;
import in.uskcorp.tool.dmt.dao.setter.SupportInteractionPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.SupportInteraction;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("supportInteractionDaoImpl")
public class SupportInteractionDAOImpl extends SupportInteractionDAO {

	@Override
	protected RowMapper<SupportInteraction> getRowMapper(Boolean b) {
		return new SupportInteractionRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.SUPPORT_INTERACTION_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return null;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.SUPPORT_INTERACTION_CREATE;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.SUPPORT_INTERACTION_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return null;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			SupportInteraction a, boolean isInsert) {
		return new SupportInteractionPreparedStatementSetter(a, isInsert);
	}

}
