package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ClientDAO;
import in.uskcorp.tool.dmt.dao.ContactDAO;
import in.uskcorp.tool.dmt.domain.Client;
import in.uskcorp.tool.dmt.domain.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("clientServiceImpl")
public class ClientServiceImpl extends ClientService {
	@Autowired
	@Qualifier("clientDaoImpl")
	ClientDAO clientDAO;

	@Autowired
	@Qualifier("contactDaoImpl")
	ContactDAO contactDAO;

	@Override
	protected APIDAO<Client> getDao() {
		return clientDAO;
	}

	@Override
	public void create(Client a) {
		Long clientId = null;
		synchronized (this) {
			getDao().create(a);
			clientId = clientDAO.getLastId();
		}

		/*for (Contact contact : a.getContact()) {
			contact.setClientId(clientId);
			contactDAO.create(contact);
		}*/
	}
}
