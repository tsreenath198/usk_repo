package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Payroll;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Calendar;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class PayrollPreparedStatementSetter implements PreparedStatementSetter {

	private boolean isInsert;
	private Payroll payroll;

	public PayrollPreparedStatementSetter(Payroll a, boolean isInsert) {
		this.payroll = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		java.sql.Date fromDate = getFirstDateOfMonth(ResultSetUtil
				.converttoSQLDate(payroll.getDate()));
		java.sql.Date toDate = getLastDateOfMonth(ResultSetUtil
				.converttoSQLDate(payroll.getDate()));

		arg0.setInt(1, payroll.getEmployeeId());
		arg0.setDate(2, fromDate);
		arg0.setDate(3, toDate);
		arg0.setString(4, payroll.getEmployeeName());
		if (isInsert) {
			arg0.setString(5, payroll.getEvaDetails());
			arg0.setInt(6, payroll.getEvaCount());
			arg0.setInt(7, payroll.getEvaRate());
			arg0.setString(8, payroll.getMisDetails());
			arg0.setInt(9, payroll.getMisCount());
			arg0.setInt(10, payroll.getMisRate());
			arg0.setString(11, payroll.getResDetails());
			arg0.setInt(12, payroll.getResCount());
			arg0.setInt(13, payroll.getResRate());
			arg0.setString(14, payroll.getSupDetails());
			arg0.setInt(15, payroll.getSupCount());
			arg0.setInt(16, payroll.getSupRate());
			arg0.setInt(17, payroll.getTotal());
		}
	}

	public static java.sql.Date getFirstDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH,
				cal.getActualMinimum(Calendar.DAY_OF_MONTH));
		return (java.sql.Date) cal.getTime();
	}

	public static java.sql.Date getLastDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH,
				cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return (java.sql.Date) cal.getTime();
	}
}
