package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.SupportTrackerRowMapper;
import in.uskcorp.tool.dmt.dao.setter.SupportTrackerPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.SupportTracker;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("supportTrackerDaoImpl")
public class SupportTrackerDAOImpl extends SupportTrackerDAO {

	@Override
	protected RowMapper<SupportTracker> getRowMapper(Boolean isReadAll) {
		return new SupportTrackerRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.SUPPORT_TRACKER_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.SUPPORT_TRACKER_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.SUPPORT_TRACKER_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.SUPPORT_TRACKER_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.SUPPORT_TRACKER_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(SupportTracker a,
			boolean isInsert) {
		return new SupportTrackerPreparedStatementSetter(a, isInsert);
	}

}
