package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.MiscellaneousDAO;
import in.uskcorp.tool.dmt.domain.Miscellaneous;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("miscellaneousServiceImpl")
public class MiscellaneousServiceImpl extends MiscellaneousService {
	@Autowired
	@Qualifier("miscellaneousDaoImpl")
	MiscellaneousDAO miscellaneousDAO;

	@Override
	protected APIDAO<Miscellaneous> getDao() {
		return miscellaneousDAO;
	}

}
