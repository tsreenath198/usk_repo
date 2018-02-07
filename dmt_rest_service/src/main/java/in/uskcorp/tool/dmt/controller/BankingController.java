package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Banking;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.BankingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.BANKING)
public class BankingController extends APIController<Banking> {
	@Autowired
	@Qualifier("bankingServiceImpl")
	BankingService bankingService;

	@Override
	protected APIService<Banking> getService() {
		return bankingService;
	}

}