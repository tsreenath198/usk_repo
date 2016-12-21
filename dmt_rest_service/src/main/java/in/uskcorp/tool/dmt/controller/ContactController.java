package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Contact;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.CONTACTS)
public class ContactController extends APIController<Contact> {
	@Autowired
	@Qualifier("contactServiceImpl")
	ContactService contactService;

	@Override
	protected APIService<Contact> getService() {
		return contactService;
	}

}
