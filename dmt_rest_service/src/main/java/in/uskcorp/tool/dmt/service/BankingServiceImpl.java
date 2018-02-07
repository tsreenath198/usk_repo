package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.BankingDAO;
import in.uskcorp.tool.dmt.domain.Banking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("bankingServiceImpl")
public class BankingServiceImpl extends BankingService {
	@Autowired
	@Qualifier("bankingDAOImpl")
	BankingDAO bankingDAO;

	@Override
	protected APIDAO<Banking> getDao() {
		return bankingDAO;
	}

}
