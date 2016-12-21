package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.SupportDAO;
import in.uskcorp.tool.dmt.domain.Support;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("supportServiceImpl")
public class SupportServiceImpl extends SupportService {
	@Autowired
	@Qualifier("supportDaoImpl")
	SupportDAO supportDAO;

	@Override
	protected APIDAO<Support> getDao() {
		return supportDAO;
	}

}
