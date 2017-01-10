package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.SalaryDAO;
import in.uskcorp.tool.dmt.domain.Salary;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("salaryServiceImpl")
public class SalaryServiceImpl extends SalaryService {
	@Autowired
	@Qualifier("salaryDaoImpl")
	SalaryDAO salaryDAO;

	@Override
	protected APIDAO<Salary> getDao() {
		return salaryDAO;
	}

}
