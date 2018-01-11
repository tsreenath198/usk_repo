package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.EXPENSES)
public class ExpenseController extends APIController<Expense> {
	@Autowired
	@Qualifier("expenseServiceImpl")
	ExpenseService expenseService;

	@Override
	protected APIService<Expense> getService() {
		return expenseService;
	}

}
