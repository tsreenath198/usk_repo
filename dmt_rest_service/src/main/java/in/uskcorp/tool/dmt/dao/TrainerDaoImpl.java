package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.TrainerRowMapper;
import in.uskcorp.tool.dmt.dao.setter.TrainerPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Trainer;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("trainerDaoImpl")
public class TrainerDaoImpl extends TrainerDAO {

	@Override
	protected RowMapper<Trainer> getRowMapper(Boolean isReadAll) {
		return new TrainerRowMapper(isReadAll);
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.TRAINER_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TRAINER_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TRAINER_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TRAINER_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TRAINER_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Trainer a,
			boolean isInsert) {
		return new TrainerPreparedStatementSetter(a, isInsert);
	}

	
}
