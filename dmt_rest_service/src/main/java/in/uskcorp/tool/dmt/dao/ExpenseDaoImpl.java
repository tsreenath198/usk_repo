package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.dao.mapper.ExpenseRowMapper;
import in.uskcorp.tool.dmt.dao.mapper.TrainingSummaryRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ExpensePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.domain.TrainingSummary;

import java.util.List;

import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

@Repository("expenseDaoImpl")
public class ExpenseDaoImpl extends ExpenseDAO {

	@Override
	protected RowMapper<Expense> getRowMapper(Boolean isReadAll) {
		return new ExpenseRowMapper();
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
	protected PreparedStatementSetter getPreparedStatementSetter(Expense a,
			boolean isInsert) {
		return new ExpensePreparedStatementSetter(a, isInsert);
	}

	@Override
	public List<TrainingSummary> getSummary() {
		return getJdbcTemplate().query(SQLConstants.TRAINING_SUMMARY,
				new TrainingSummaryRowMapper());
	}
}
