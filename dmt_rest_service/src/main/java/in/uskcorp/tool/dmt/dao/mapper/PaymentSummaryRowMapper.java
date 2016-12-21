package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.PaymentSummary;
import in.uskcorp.tool.dmt.util.ResultSetUtil;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.jdbc.core.RowMapper;

public class PaymentSummaryRowMapper implements RowMapper<PaymentSummary> {

	@Override
	public PaymentSummary mapRow(ResultSet resultSet, int i)
			throws SQLException {
		PaymentSummary paymentSummary = new PaymentSummary();
		paymentSummary.setName(resultSet.getString("name"));
		paymentSummary.setStartDate(ResultSetUtil.getDate(resultSet,
				"start_date"));
		paymentSummary.setMonth(resultSet.getInt("month"));
		paymentSummary.setAmount(resultSet.getInt("amount"));
		paymentSummary.setRec(resultSet.getString("rec"));
		paymentSummary.setBalance(resultSet.getString("balance"));
		paymentSummary.setInr(resultSet.getInt("inr"));

		return paymentSummary;
	}

}
