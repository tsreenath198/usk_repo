package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.PayrollRowMapper;
import in.uskcorp.tool.dmt.dao.setter.PayrollPreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Payroll;

import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("payrollDaoImpl")
public class PayrollDaoImpl extends PayrollDAO {

	@Override
	protected RowMapper<Payroll> getRowMapper(Boolean isReadAll) {
		return new PayrollRowMapper();
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.PAYROLL_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.PAYROLL_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.PAYROLL_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.PAYROLL_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.PAYROLL_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Payroll a,
			boolean isInsert) {
		return new PayrollPreparedStatementSetter(a, isInsert);
	}

	public Payroll readByValues(int employeeId) {
		return getJdbcTemplate().queryForObject(
				SQLConstants.PAYROLL_SELECT_BY_ID, new Object[] { employeeId },
				getRowMapper(false));
	}

	@Override
	public Payroll readByMonthAndId(int employeeId, Date fromDate, Date toDate) {
		return getJdbcTemplate().queryForObject(
				SQLConstants.PAYROLL_SELECT_BY_MONTH_AND_ID,
				new Object[] { employeeId, fromDate, toDate },
				getRowMapper(false));

	}
}
