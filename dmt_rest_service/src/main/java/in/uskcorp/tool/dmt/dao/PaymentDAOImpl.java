/*package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.PaymentSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.PaymentPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Invoice;
import in.uskcorp.tool.dmt.domain.PaymentSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("paymentDaoImpl")
public class PaymentDAOImpl extends PaymentDAO {

	@Override
	protected RowMapper<PaymentSummary> getRowMapper(Boolean isReadAll) {
		return new PaymentSummaryRowMapper();
	}

	@Override
	protected String getReadAllQuery() {

		return SQLConstants.PAYMENT_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.PAYMENT_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.PAYMENT_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.PAYMENT_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.PAYMENT_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Payment a,
			boolean isInsert) {
		return new PaymentPreparedStatementSetter(a, isInsert);
	}

	@Override
	public List<PaymentSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.PAYMENT_SELECT,
				new PaymentSummaryRowMapper());
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Invoice a,
			boolean isInsert) {
		// TODO Auto-generated method stub
		return null;
	}
}
*/