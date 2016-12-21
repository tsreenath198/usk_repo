package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Support;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.SupportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.SUPPORTS)
public class SupportController extends APIController<Support> {
	@Autowired
	@Qualifier("supportServiceImpl")
	SupportService supportService;

	@Override
	protected APIService<Support> getService() {
		return supportService;
	}

}
