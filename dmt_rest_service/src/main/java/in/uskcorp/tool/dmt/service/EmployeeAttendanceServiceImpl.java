package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.EmployeeAttendanceDAO;
import in.uskcorp.tool.dmt.dao.EmployeeDAO;
import in.uskcorp.tool.dmt.domain.Employee;
import in.uskcorp.tool.dmt.domain.EmployeeAttendance;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("employeeAttendenceServiceImpl")
public class EmployeeAttendanceServiceImpl extends EmployeeAttendanceService {
	@Autowired
	@Qualifier("employeeAttendenceDaoImpl")
	EmployeeAttendanceDAO employeeAttendenceDAO;

	@Override
	protected APIDAO<EmployeeAttendance> getDao() {
		return employeeAttendenceDAO;
	}

}
