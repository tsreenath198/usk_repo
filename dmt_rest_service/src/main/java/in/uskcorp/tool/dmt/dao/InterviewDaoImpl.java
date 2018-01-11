package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.InterviewRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.InterviewSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.InterviewPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Interview;
import in.uskcorp.tool.dmt.domain.InterviewSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("interviewDaoImpl")
public class InterviewDaoImpl extends InterviewDAO {

	@Override
	protected RowMapper<Interview> getRowMapper(Boolean isReadAll) {
		return new InterviewRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.INTERVIEW_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.INTERVIEW_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.INTERVIEW_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.INTERVIEW_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.INTERVIEW_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Interview a,
			boolean isInsert) {
		return new InterviewPreparedStatementSetter(a, isInsert);
	}

	@Override
	public List<InterviewSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.INTERVIEW_SUMMARY,
				new InterviewSummaryRowMapper());

	}
}
