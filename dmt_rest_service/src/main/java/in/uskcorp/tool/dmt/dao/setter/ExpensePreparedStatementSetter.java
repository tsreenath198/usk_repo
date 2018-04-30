package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.dao.ExpenseDAOImpl;
import in.uskcorp.tool.dmt.dao.SQLConstants;
import in.uskcorp.tool.dmt.dao.mapper.ExpenseRowMapper;
import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;

public class ExpensePreparedStatementSetter implements PreparedStatementSetter {
	private Expense expense;
	private boolean isInsert;
	private long amount;
	private String decide;

	public ExpensePreparedStatementSetter(Expense expense, boolean isInsert, long amount, String decide) {
		super();
		this.expense = expense;
		this.isInsert = isInsert;
		this.amount = amount;
		this.decide = decide;
	}

	public ExpensePreparedStatementSetter(Expense a, boolean isInsert) {
		this.expense = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		if (decide.equalsIgnoreCase("credit")) {
			arg0.setDate(1, ResultSetUtil.converttoSQLDate(expense.getDate()));
			arg0.setString(2, expense.getPurposeOfExpense());
			arg0.setLong(3, amount);
			arg0.setLong(4, 0);
			arg0.setDate(5, ResultSetUtil.converttoSQLDate(new Date()));
			arg0.setString(6, expense.getDescription());
		} else {
			arg0.setDate(1, ResultSetUtil.converttoSQLDate(expense.getDate()));
			arg0.setString(2, expense.getPurposeOfExpense());
			arg0.setLong(3, 0);
			arg0.setLong(4, amount);
			arg0.setDate(5, ResultSetUtil.converttoSQLDate(new Date()));
			arg0.setString(6, expense.getDescription());
		}
		

		if (isInsert) {
			arg0.setInt(7, expense.getId());
		}

	}
}
