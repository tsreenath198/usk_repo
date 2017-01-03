package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.PaymentSummary;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class PaymentSummaryRowMapper implements RowMapper<PaymentSummary> {

	@Override
	public PaymentSummary mapRow(ResultSet resultSet, int i)
			throws SQLException {
		PaymentSummary paymentSummary = new PaymentSummary();
		paymentSummary.setCandidateName(resultSet.getString("candidateName"));
		paymentSummary.setClientName(resultSet.getString("clientName"));
		paymentSummary.setCategory(resultSet.getString("category"));
		paymentSummary.setAssistedBy(resultSet.getString("assistedBy"));
		return paymentSummary;
		
	}
	
}
