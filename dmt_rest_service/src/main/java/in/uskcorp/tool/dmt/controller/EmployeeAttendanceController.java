package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.EmployeeAttendance;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.EmployeeAttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.EMPLOYEE_ATTENDANCE)
public class EmployeeAttendanceController extends APIController<EmployeeAttendance> {
	@Autowired
	@Qualifier("employeeAttendenceServiceImpl")
	EmployeeAttendanceService employeeAttendanceService;

	@Override
	protected APIService<EmployeeAttendance> getService() {
		return employeeAttendanceService;
	}

}
