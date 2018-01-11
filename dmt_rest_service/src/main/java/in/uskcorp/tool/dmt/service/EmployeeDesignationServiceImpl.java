package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.EmployeeDesignationDAO;
import in.uskcorp.tool.dmt.domain.EmployeeDesignation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("employeeDesignationServiceImpl")
public class EmployeeDesignationServiceImpl extends EmployeeDesignationService {
	@Autowired
	@Qualifier("employeeDesignationDaoImpl")
	EmployeeDesignationDAO employeeDesignationDAO;

	@Override
	protected APIDAO<EmployeeDesignation> getDao() {
		return employeeDesignationDAO;
	}
}
