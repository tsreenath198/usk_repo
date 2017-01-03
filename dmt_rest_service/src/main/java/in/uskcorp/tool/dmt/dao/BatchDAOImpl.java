package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.BatchRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.BatchSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.BatchPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Batch;
import in.uskcorp.tool.dmt.domain.BatchSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("batchDAOImpl")
public class BatchDAOImpl extends BatchDAO {

	@Override
	protected RowMapper<Batch> getRowMapper(Boolean isReadAll) {
		return new BatchRowMapper(isReadAll);
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.BATCH_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.BATCH_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.BATCH_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.BATCH_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.BATCH_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Batch a,
			boolean isInsert) {
		return new BatchPreparedStatementSetter(a, isInsert);
	}

	@Override
	public List<BatchSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.BATCH_DASHBOARD,
				new BatchSummaryRowMapper());
	}
}
