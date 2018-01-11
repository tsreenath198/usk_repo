package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.SupportRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.SupportSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.SupportPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Support;
import in.uskcorp.tool.dmt.domain.SupportSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("supportDaoImpl")
public class SupportDaoImpl extends SupportDAO {

	@Override
	protected RowMapper<Support> getRowMapper(Boolean isReadAll) {
		return new SupportRowMapper(isReadAll);
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.SUPPORT_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.SUPPORT_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.SUPPORT_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.SUPPORT_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.SUPPORT_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Support a,
			boolean isInsert) {
		return new SupportPreparedStatementSetter (a, isInsert);
	}

	@Override
	public List<SupportSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.SUPPORT_DASHBOARD,	
				new SupportSummaryRowMapper());
	}
	
	

}
