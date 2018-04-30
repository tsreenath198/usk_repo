package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Expense;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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

	@RequestMapping(value = DMTRestURIConstants.CREATE, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public  @ResponseBody ResponseEntity<String> create(@RequestBody Expense expense) {
		try {
			expenseService.insert(expense);
			return new ResponseEntity<String>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("Funds not availble ",HttpStatus.SERVICE_UNAVAILABLE);
		}
		
	}
	@RequestMapping(value = DMTRestURIConstants.UPDATE, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public  @ResponseBody ResponseEntity<String> update(@RequestBody Expense expense) {
		try {
			expenseService.edit(expense);
			return new ResponseEntity<String>(HttpStatus.OK);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>("debit amount more than availble balance ",HttpStatus.SERVICE_UNAVAILABLE);
		}
		
	}
}
