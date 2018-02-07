package in.uskcorp.tool.dmt.dao.setter;

import in.uskcorp.tool.dmt.dao.ExpenseDaoImpl;
import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Date;

import org.springframework.jdbc.core.PreparedStatementSetter;

public class ExpensePreparedStatementSetter implements PreparedStatementSetter {
	private Expense expense;
	private boolean isInsert;

	public ExpensePreparedStatementSetter(Expense a, boolean isInsert) {
		this.expense = a;
		this.isInsert = isInsert;
	}

	@Override
	public void setValues(PreparedStatement arg0) throws SQLException {
		int credit = expense.getCredit();
		int debit = expense.getDebit();
		ExpenseDaoImpl expenseDaoImpl = new ExpenseDaoImpl();
		int balance = expenseDaoImpl.getBalance();
		if (credit > 0) {
			balance = balance + credit;
		} else {
			balance = balance - debit;
		}

		arg0.setDate(1, ResultSetUtil.converttoSQLDate(expense.getDate()));
		arg0.setString(2, expense.getPurposeOfExpense());
		arg0.setInt(3, credit);
		arg0.setInt(4, debit);
		arg0.setInt(5, balance);
		arg0.setDate(6, ResultSetUtil.converttoSQLDate(new Date()));
		arg0.setString(7, expense.getDescription());
		if (!isInsert) {
			arg0.setInt(8, expense.getId());
		}
	}
}
