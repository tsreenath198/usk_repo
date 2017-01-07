package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.EmployeeAttendanceRowMapper;
import in.uskcorp.tool.dmt.dao.setter.EmployeeAttendancePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.EmployeeAttendance;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("employeeAttendenceDaoImpl")
public class EmployeeAttendanceDAOImpl extends EmployeeAttendanceDAO {

	@Override
	protected RowMapper<EmployeeAttendance> getRowMapper(Boolean isReadAll) {
		return new EmployeeAttendanceRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.EMPLOYEE_ATTENDANCE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.EMPLOYEE_ATTENDANCE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.EMPLOYEE_ATTENDANCE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.EMPLOYEE_ATTENDANCE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.EMPLOYEE_ATTENDANCE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			EmployeeAttendance a, boolean isInsert) {
		return new EmployeeAttendancePreparedStatementSetter(a, isInsert);
	}

}
