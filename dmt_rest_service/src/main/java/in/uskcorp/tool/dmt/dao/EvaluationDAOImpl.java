package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.EvaluationRowMapper;
import in.uskcorp.tool.dmt.dao.setter.EvaluationPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Evaluation;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("evaluationDaoImpl")
public class EvaluationDAOImpl extends EvaluationDAO {

	@Override
	protected RowMapper<Evaluation> getRowMapper(Boolean isReadAll) {
		return new EvaluationRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.EVALUATION_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.EVALUATION_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.EVALUATION_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.EVALUATION_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.EVALUATION_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Evaluation a,
			boolean isInsert) {
		return new EvaluationPreparedStatementSetter(a, isInsert);
	}

}
