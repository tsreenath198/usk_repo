package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Salary;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.SalaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.SALARY)
public class SalaryController extends APIController<Salary> {
	@Autowired
	@Qualifier("salaryServiceImpl")
	SalaryService salaryService;

	@Override
	protected APIService<Salary> getService() {
		return salaryService;
	}

}
