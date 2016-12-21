package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.EmployeeDAO;
import in.uskcorp.tool.dmt.domain.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("employeeServiceImpl")
public class EmployeeServiceImpl extends EmployeeService {
	@Autowired
	@Qualifier("employeeDaoImpl")
	EmployeeDAO employeeDAO;

	@Override
	protected APIDAO<Employee> getDao() {
		return employeeDAO;
	}

}
