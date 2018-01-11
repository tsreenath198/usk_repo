package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.SupportInteraction;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.SupportInteractionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.SUPPORTINTERACTIONS)
public class SupportInteractionController extends APIController<SupportInteraction> {

	@Autowired
	@Qualifier("supportInteractionServiceImpl")
	SupportInteractionService supportInteractionService;

	@Override
	protected APIService<SupportInteraction> getService() {
		return supportInteractionService;
	}
	
}