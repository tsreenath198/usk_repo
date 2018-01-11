package in.uskcorp.tool.dmt.dao;

import java.util.List;

import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.domain.TrainingSummary;

public abstract class ExpenseDAO extends APIDAO<Expense> {
	public abstract List<TrainingSummary> getSummary();
}
