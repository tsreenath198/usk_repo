package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Miscellaneous;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.MiscellaneousService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.MISCELLANEOUS)
public class MiscellaneousController extends APIController<Miscellaneous> {
	@Autowired
	@Qualifier("miscellaneousServiceImpl")
	MiscellaneousService miscellaneousService;

	@Override
	protected APIService<Miscellaneous> getService() {
		return miscellaneousService;
	}

}
