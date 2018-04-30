package in.uskcorp.tool.dmt.dao;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import in.uskcorp.tool.dmt.dao.mapper.ExpenseRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ExpensePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Expense;

@Repository("expenseDaoImpl")
public class ExpenseDAOImpl extends ExpenseDAO {

	@Override
	protected RowMapper<Expense> getRowMapper(Boolean isReadAll) {
		return new ExpenseRowMapper(isReadAll);
	}

	@Override
	protected String getReadAllQuery() {
		return SQLConstants.EXPENSE_SELECT;
	}

	@Override
	protected String getReadQuery() {
		return SQLConstants.EXPENSE_SELECT_BY_ID;
	}

	@Override
	protected String getInsertQuery() {
		return SQLConstants.EXPENSE_INSERT;
	}

	@Override
	protected String getUpdateQuery() {
		return SQLConstants.EXPENSE_UPDATE;
	}

	@Override
	protected String getDeleteQuery() {
		return SQLConstants.EXPENSE_DELETE;
	}

	@Override
	protected PreparedStatementSetter getPreparedStatementSetter(Expense a, boolean isInsert) {
		return new ExpensePreparedStatementSetter(a, isInsert);
	}

	@Override
	public void insert(Expense e,long amount,String decide) {

		getJdbcTemplate().update(getInsertQuery(),new ExpensePreparedStatementSetter(e, false, amount,decide));
	}
	@Override
	public void edit(Expense e,long amount,String decide) {

		getJdbcTemplate().update(getUpdateQuery(),new ExpensePreparedStatementSetter(e, true, amount, decide));
	}	

	@Override
	public long findBalance() {
		long avlBal = getJdbcTemplate().queryForLong(SQLConstants.BALANCE);
		return avlBal;
	}

}
