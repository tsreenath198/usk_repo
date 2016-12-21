package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.OpportunityTrackerRowMapper;
import in.uskcorp.tool.dmt.dao.setter.OpportunityTrackerPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.OpportunityTracker;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("opportunityTrackerDaoImpl")
public class OpportunityTrackerDAOImpl extends OpportunityTrackerDAO {

	@Override
	protected RowMapper<OpportunityTracker> getRowMapper(Boolean isReadAll) {
		return new OpportunityTrackerRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.OPPURTINITY_TRACKER_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.OPPURTINITY_TRACKER_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.OPPURTINITY_TRACKER_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.OPPURTINITY_TRACKER_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.OPPURTINITY_TRACKER_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			OpportunityTracker a, boolean isInsert) {
		return new OpportunityTrackerPreparedStatementSetter(a, isInsert);
	}

}
