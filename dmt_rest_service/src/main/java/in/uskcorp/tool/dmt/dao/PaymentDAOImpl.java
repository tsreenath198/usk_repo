package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.PaymentSummaryRowMapper;
import in.uskcorp.tool.dmt.domain.PaymentSummary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("PaymentDAOImpl")
public class PaymentDAOImpl extends PaymentDAO {
	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	@Override
	public List<PaymentSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.PAYMENT_DASHBOARD,
				new PaymentSummaryRowMapper());
	}

	@Override
	protected RowMapper<PaymentSummary> getRowMapper(Boolean b) {

		return null;
	}

	@Override
	protected String getReadAllQuery() {
		return null;
	}

	@Override
	protected String getReadQuery() {
		return null;
	}

	@Override
	protected String getInsertQuery() {
		return null;
	}

	@Override
	protected String getUpdateQuery() {
		return null;
	}

	@Override
	protected String getDeleteQuery() {
		return null;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(
			PaymentSummary a, boolean isInsert) {
		return null;
	}

}
