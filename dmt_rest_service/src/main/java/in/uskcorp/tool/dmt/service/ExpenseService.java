package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.domain.Expense;

public abstract class ExpenseService extends APIService<Expense> {
	public abstract void insert(Expense e) throws Exception;
	public abstract void edit(Expense e) throws Exception ;
}
