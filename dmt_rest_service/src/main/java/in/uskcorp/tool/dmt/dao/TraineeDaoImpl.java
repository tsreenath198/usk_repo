package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.TraineeRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.TrainingSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.TraineePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.domain.TrainingSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("traineeDaoImpl")
public class TraineeDaoImpl extends TraineeDAO {

	@Override
	protected RowMapper<Trainee> getRowMapper(Boolean isReadAll) {
		return new TraineeRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.TRAINEE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TRAINEE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TRAINEE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TRAINEE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TRAINEE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Trainee a,
			boolean isInsert) {
		return new TraineePreparedStatementSetter(a, isInsert);
	}

	@Override
	public List<TrainingSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.TRAINING_SUMMARY,
				new TrainingSummaryRowMapper());
	}

	public List<Trainee> readByValues(int batchId) {
		return getJdbcTemplate().query(SQLConstants.TRAINEE_SELECT_BY_BATCHID,
				new Object[] { batchId }, getRowMapper(false));
	}

}
