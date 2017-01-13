package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.TimeSheetRowMapper;
import in.uskcorp.tool.dmt.dao.setter.TimeSheetPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.TimeSheet;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("timeSheetDaoImpl")
public class TimeSheetDAOImpl extends TimeSheetDAO {

	@Override
	protected RowMapper<TimeSheet> getRowMapper(Boolean isReadAll) {
		return new TimeSheetRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.TIME_SHEET_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.TIME_SHEET_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.TIME_SHEET_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.TIME_SHEET_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.TIME_SHEET_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(TimeSheet a,
			boolean isInsert) {
		return new TimeSheetPreparedStatementSetter(a, isInsert);
	}

	

}
