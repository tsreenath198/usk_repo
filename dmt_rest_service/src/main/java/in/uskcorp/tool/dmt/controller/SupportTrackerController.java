package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.SupportTracker;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.SupportTrackerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.SUPPORT_TRACKERS)
public class SupportTrackerController extends APIController<SupportTracker> {
	@Autowired
	@Qualifier("supportTrackerServiceImpl")
	SupportTrackerService supportTrackerService;

	@Override
	protected APIService<SupportTracker> getService() {
		return supportTrackerService;
	}

}
