package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.domain.Payment;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class PaymentPreparedStatementSetter implements PreparedStatementSetter {
	private Payment payment;
	private boolean isInsert;

	public PaymentPreparedStatementSetter(Payment a, boolean isInsert) {
		this.payment = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		arg0.setString(1, payment.getName());
		arg0.setString(2, payment.getAddress());
		arg0.setString(3, payment.getCreate_date());
		arg0.setString(4, payment.getDescription());
		arg0.setString(5, payment.getContact());
		/*arg0.setString(1, payment.getCandidateName());
		arg0.setString(2, payment.getClientName());
		arg0.setString(3, payment.getAssisted_by());
		arg0.setString(4, payment.getCategory());*/
		//arg0.setString(2, paymentSummary.getAddress());
		arg0.setDate(3, ResultSetUtil.converttoSQLDate(new Date()));
		//arg0.setString(4, paymentSummary.getDescription());
/*		if (!isInsert) {
			arg0.setInt(5, payment.getId());
		}
*/
	}
}
