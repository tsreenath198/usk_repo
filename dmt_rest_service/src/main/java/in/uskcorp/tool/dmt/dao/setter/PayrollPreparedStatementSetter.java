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
	private boolean value;
	

	public PayrollPreparedStatementSetter(Payroll a, boolean isInsert,boolean value) {
		this.payroll = a;
		this.isInsert = isInsert;
		this.value=value;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		// java.sql.Date fromDate =
		// getFirstDateOfMonth(ResultSetUtil.converttoSQLDate(payroll.getDate()));
		// java.sql.Date toDate =
		// getLastDateOfMonth(ResultSetUtil.converttoSQLDate(payroll.getDate()));

		arg0.setInt(1, payroll.getEmployeeId());
		// arg0.setDate(2, fromDate);
		
		// arg0.setDate(3, toDate);
		arg0.setString(2, payroll.getEmployee());		
		
		
		if(value)
		arg0.setString(3, payroll.getEvaDetails());
		arg0.setInt(4, payroll.getEvaCount());
		arg0.setInt(5, payroll.getEvaRate());
		arg0.setString(6, payroll.getMisDetails());
		arg0.setInt(7, payroll.getMisCount());
		arg0.setInt(8, payroll.getMisRate());
		arg0.setString(9, payroll.getResDetails());
		arg0.setInt(10, payroll.getResCount());
		arg0.setInt(11, payroll.getResRate());
		arg0.setString(12, payroll.getSupDetails());
		arg0.setInt(13, payroll.getSupCount());
		arg0.setInt(14, payroll.getSupRate());
		arg0.setInt(15, payroll.getTotal());
		arg0.setInt(16, payroll.getBaseSalary());
		arg0.setInt(17, payroll.getTrainingCount());
		arg0.setDate(18, ResultSetUtil.converttoSQLDate(payroll.getDate()));
		arg0.setDate(19, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(20, payroll.getDescription());
		if (!isInsert) {
			arg0.setInt(21, payroll.getId());
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
