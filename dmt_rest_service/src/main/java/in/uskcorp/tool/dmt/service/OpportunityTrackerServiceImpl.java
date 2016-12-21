package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.OpportunityTrackerDAO;
import in.uskcorp.tool.dmt.domain.OpportunityTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("opportunityTrackerServiceImpl")
public class OpportunityTrackerServiceImpl extends OpportunityTrackerService {
	@Autowired
	@Qualifier("opportunityTrackerDaoImpl")
	OpportunityTrackerDAO opportunityTrackerDAO;

	@Override
	protected APIDAO<OpportunityTracker> getDao() {
		return opportunityTrackerDAO;
	}
	
}
