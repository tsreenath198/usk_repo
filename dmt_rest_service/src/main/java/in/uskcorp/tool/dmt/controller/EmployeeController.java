package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Employee;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.Employees)
public class EmployeeController extends APIController<Employee> {
	@Autowired
	@Qualifier("employeeServiceImpl")
	EmployeeService employeeService;

	@Override
	protected APIService<Employee> getService() {
		return employeeService;
	}

}
