package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Client;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.CLIENTS)
public class ClientController extends APIController<Client> {
	@Autowired
	@Qualifier("clientServiceImpl")
	ClientService clientService;

	@Override
	protected APIService<Client> getService() {
		return clientService;
	}

}
