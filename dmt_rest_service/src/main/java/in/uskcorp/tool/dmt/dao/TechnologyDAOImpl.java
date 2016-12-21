package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.TechnologyRowMapper;
import in.uskcorp.tool.dmt.dao.setter.TechnologyPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Technology;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("technologyDaoImpl")
public class TechnologyDAOImpl extends TechnologyDAO {

	@Override
	protected RowMapper<Technology> getRowMapper(Boolean isReadAll) {
		return new TechnologyRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.TECHNOLOGY_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TECHNOLOGY_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TECHNOLOGY_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TECHNOLOGY_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TECHNOLOGY_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Technology a,
			boolean isInsert) {
		return new TechnologyPreparedStatementSetter(a, isInsert);
	}

}
