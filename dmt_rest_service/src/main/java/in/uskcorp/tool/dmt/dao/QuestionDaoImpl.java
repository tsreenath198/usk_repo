package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.QuestionRowMapper;
import in.uskcorp.tool.dmt.dao.setter.QuestionPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Question;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("questionDaoImpl")
public class QuestionDaoImpl extends QuestionDAO {

	@Override
	protected RowMapper<Question> getRowMapper(Boolean isReadAll) {
		return new QuestionRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.QUESTION_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.QUESTION_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.QUESTION_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.QUESTION_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.QUESTION_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Question a,
			boolean isInsert) {
		return new QuestionPreparedStatementSetter(a, isInsert);
	}
}
