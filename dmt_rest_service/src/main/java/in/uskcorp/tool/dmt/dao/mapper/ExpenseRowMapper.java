package in.uskcorp.tool.dmt.dao.mapper;

import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

public class ExpenseRowMapper implements RowMapper<Expense> {
	private Boolean isReadAll;

	public ExpenseRowMapper(Boolean isReadAll) {
		this.isReadAll = isReadAll;
	}

	@Override
	public Expense mapRow(ResultSet resultSet, int i) throws SQLException {
		Expense expense = new Expense();
		expense.setId(resultSet.getInt("id"));
		expense.setDate(ResultSetUtil.getDate(resultSet, "date"));
		expense.setPurposeOfExpense(resultSet.getString("purpose_of_expense"));
		expense.setCredit(resultSet.getInt("credit"));
		expense.setDebit(resultSet.getInt("debit"));
		expense.setBalance(resultSet.getLong("balance"));
		expense.setCreatedDate(ResultSetUtil.getDate(resultSet, "created_date"));
		expense.setUpdatedDate(ResultSetUtil.getDate(resultSet, "updated_date"));
		expense.setDescription(resultSet.getString("description"));
		expense.setTypeOfExpense(resultSet.getBoolean("active_flag"));

		if (isReadAll) {
			expense.setActiveFlag(resultSet.getInt("active_flag"));
		}
		return expense;
	}
}
