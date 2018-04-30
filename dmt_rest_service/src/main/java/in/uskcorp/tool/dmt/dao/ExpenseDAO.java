package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Expense;

public abstract class ExpenseDAO extends APIDAO<Expense> {

	 public abstract long findBalance();
	public abstract void insert(Expense e,long amount,String decide);
	public abstract void edit(Expense e, long amount, String decide) ;
}
