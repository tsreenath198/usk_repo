/*package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.PaymentSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class PaymentPreparedStatementSetter implements PreparedStatementSetter {
	private PaymentSummary paymentSummary;
	private boolean isInsert;

	public PaymentPreparedStatementSetter(paymentSummary a, boolean isInsert) {
		this.paymentSummary = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, paymentSummary.getName());
		arg0.setString(2, paymentSummary.getAddress());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(4, paymentSummary.getDescription());
		if (!isInsert) {
			arg0.setInt(5, paymentSummary.getId());
		}

	}
}
*/