package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.CoFounderDAO;
import in.uskcorp.tool.dmt.domain.CoFounder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("coFounderServiceImpl")
public class CoFounderServiceImpl extends CoFounderService {
	@Autowired
	@Qualifier("coFounderDaoImpl")
	CoFounderDAO coFounderDAO;

	@Override
	protected APIDAO<CoFounder> getDao() {
		return coFounderDAO;
	}

}
