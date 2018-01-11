package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.CoFounder;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.CoFounderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.COFOUNDER)
public class CoFounderController extends APIController<CoFounder> {
	@Autowired
	@Qualifier("coFounderServiceImpl")
	CoFounderService coFounderService;

	@Override
	protected APIService<CoFounder> getService() {
		return coFounderService;
	}

}
