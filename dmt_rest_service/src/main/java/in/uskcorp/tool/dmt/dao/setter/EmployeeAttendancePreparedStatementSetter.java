package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.EmployeeAttendance;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class EmployeeAttendancePreparedStatementSetter implements PreparedStatementSetter {
	private EmployeeAttendance employeeAttendence;
	private boolean isInsert;

	public EmployeeAttendancePreparedStatementSetter(EmployeeAttendance a, boolean isInsert) {
		this.employeeAttendence = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		
		arg0.setInt(1, employeeAttendence.getEmployeeId());
		arg0.setString(2, employeeAttendence.getEmployeeName());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(employeeAttendence.getDateOfAttendence()));
		arg0.setDate(4,ResultSetUtil.converttoSQLDate(employeeAttendence.getCreatedDate()));
		arg0.setDate(5,ResultSetUtil.converttoSQLDate(employeeAttendence.getUpdatedDate()));
		arg0.setString(6, employeeAttendence.getInTime());
		arg0.setString(7, employeeAttendence.getOutTime());
		
				if (!isInsert) {
			arg0.setInt(8, employeeAttendence.getId());
		}
			
				

	}
}
