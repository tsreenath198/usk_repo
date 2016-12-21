package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.OpportunityTracker;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.OpportunityTrackerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.OPPORTUNITY_TRACKERS)
public class OppurtunityTrackerController extends
		APIController<OpportunityTracker> {
	@Autowired
	@Qualifier("opportunityTrackerServiceImpl")
	OpportunityTrackerService opportunityTrackerService;

	@Override
	protected APIService<OpportunityTracker> getService() {
		return opportunityTrackerService;
	}

}
