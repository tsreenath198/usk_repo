package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.EmployeeDesignation;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.EmployeeDesignationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.EMPLOYEES_DESIGNATION)
public class EmployeeDesignationController extends
		APIController<EmployeeDesignation> {
	@Autowired
	@Qualifier("employeeDesignationServiceImpl")
	EmployeeDesignationService employeeDesignationService;

	@Override
	protected APIService<EmployeeDesignation> getService() {
		return employeeDesignationService;
	}
}
