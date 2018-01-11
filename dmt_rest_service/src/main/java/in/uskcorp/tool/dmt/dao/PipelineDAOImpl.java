package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.PipelineRowMapper;
import in.uskcorp.tool.dmt.dao.setter.PipelinePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Pipeline;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("pipelineDaoImpl")
public class PipelineDAOImpl extends PipelineDAO {

	@Override
	protected RowMapper<Pipeline> getRowMapper(Boolean isReadAll) {
		return new PipelineRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.PIPELINE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.PIPELINE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.PIPELINE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.PIPELINE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.PIPELINE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Pipeline a,
			boolean isInsert) {
		return new PipelinePreparedStatementSetter(a, isInsert);
	}
}

