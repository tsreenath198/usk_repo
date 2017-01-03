package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.AttendanceRowMapper;
import in.uskcorp.tool.dmt.dao.setter.AttendancePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Attendance;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("attendanceDAOImpl")
public class AttendanceDAOImpl extends AttendanceDAO {

	@Override
	protected RowMapper<Attendance> getRowMapper(Boolean isReadAll) {
		return new AttendanceRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.ATTENDANCE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.ATTENDANCE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.ATTENDANCE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.ATTENDANCE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.ATTENDANCE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Attendance a,
			boolean isInsert) {
		return new AttendancePreparedStatementSetter(a, isInsert);
	}
}
