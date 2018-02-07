package in.uskcorp.tool.dmt.dao;


import in.uskcorp.tool.dmt.domain.Expense;


public abstract class ExpenseDAO extends APIDAO<Expense> {
	public abstract  Expense getSummary();
}
