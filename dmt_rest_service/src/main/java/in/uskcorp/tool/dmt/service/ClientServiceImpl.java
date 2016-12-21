package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ClientDAO;
import in.uskcorp.tool.dmt.domain.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("clientServiceImpl")
public class ClientServiceImpl extends ClientService {
	@Autowired
	@Qualifier("clientDaoImpl")
	ClientDAO clientDAO;

	@Override
	protected APIDAO<Client> getDao() {
		return clientDAO;
	}

}
