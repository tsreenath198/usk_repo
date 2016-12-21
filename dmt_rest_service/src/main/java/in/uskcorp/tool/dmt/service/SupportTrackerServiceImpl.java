package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.SupportTrackerDAO;
import in.uskcorp.tool.dmt.domain.SupportTracker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("supportTrackerServiceImpl")
public class SupportTrackerServiceImpl extends SupportTrackerService {
	@Autowired
	@Qualifier("supportTrackerDaoImpl")
	SupportTrackerDAO supportTrackerDAO;

	@Override
	protected APIDAO<SupportTracker> getDao() {
		return supportTrackerDAO;
	}
	
}
