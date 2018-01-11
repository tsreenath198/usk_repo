package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.ResumeRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ResumePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Resume;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("resumeDaoImpl")
public class ResumeDAOImpl extends ResumeDAO {

	@Override
	protected RowMapper<Resume> getRowMapper(Boolean isReadAll) {
		return new ResumeRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.RESUME_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.RESUME_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.RESUME_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.RESUME_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.RESUME_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Resume a,
			boolean isInsert) {
		return new ResumePreparedStatementSetter(a, isInsert);
	}
}
