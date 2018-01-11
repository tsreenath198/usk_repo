package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.BatchAttendanceRowMapper;
import in.uskcorp.tool.dmt.dao.setter.BatchAttendancePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.BatchAttendance;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("batchAttendanceDaoImpl")
public class BatchAttendanceDAOImpl extends BatchAttendanceDAO {

	@Override
	protected RowMapper<BatchAttendance> getRowMapper(Boolean isReadAll) {
		return new BatchAttendanceRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.BATCH_ATTENDANCE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.BATCH_ATTENDANCE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.BATCH_ATTENDANCE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.BATCH_ATTENDANCE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.BATCH_ATTENDANCE_DELETE;
	}

/*	public void addMulti(String[] strings,List<String> list){
	    for (int i = 0; i < strings.length; i++) {
	        list.add(strings[i]);
	    }*/
	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			BatchAttendance a, boolean isInsert) {
		return new BatchAttendancePreparedStatementSetter(a, isInsert);
	}

}
