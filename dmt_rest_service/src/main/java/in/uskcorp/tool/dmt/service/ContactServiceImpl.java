package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ContactDAO;
import in.uskcorp.tool.dmt.domain.Contact;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("contactServiceImpl")
public class ContactServiceImpl extends ContactService {
	@Autowired
	@Qualifier("contactDaoImpl")
	ContactDAO contactDAO;

	@Override
	protected APIDAO<Contact> getDao() {
		return contactDAO;
	}

}
