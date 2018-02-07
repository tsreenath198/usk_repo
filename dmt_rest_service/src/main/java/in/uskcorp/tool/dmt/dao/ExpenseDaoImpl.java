package in.uskcorp.tool.dmt.dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;

import in.uskcorp.tool.dmt.dao.mapper.ExpenseRowMapper;
import in.uskcorp.tool.dmt.dao.setter.ExpensePreparedStatementSetter;
import in.uskcorp.tool.dmt.domain.Expense;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementSetter;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.mysql.jdbc.Statement;

@Repository("expenseDaoImpl")
public class ExpenseDaoImpl extends ExpenseDAO {
	@Autowired
	@Qualifier("jdbcTemplate")
	private JdbcTemplate jdbcTemplate;

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
	public Expense getSummary() {
		return (Expense) getJdbcTemplate().query(SQLConstants.BALANCE,
				new ExpenseRowMapper());
	}

	public int getBalance() {
		int balance = 0;
		try {
			String url = "jdbc:mysql://localhost:3306/dmt_tool_v4_dbb";
			String driver = "com.mysql.jdbc.Driver";
			Class.forName(driver);
			Connection conn = DriverManager.getConnection(url, "root", "");
			Statement stmt = (Statement) conn.createStatement();
			ResultSet rs;

			rs = stmt.executeQuery(SQLConstants.BALANCE);
			while (rs.next()) {
				balance = rs.getInt("balance");
			}
			rs.close();
			stmt.close();
			conn.close();

		} catch (Exception e) {
			System.out.println("null pointer exception");
		}
		return balance;
	}

}
