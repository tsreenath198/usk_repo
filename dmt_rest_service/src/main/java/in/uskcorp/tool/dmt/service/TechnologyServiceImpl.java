package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.TechnologyDAO;
import in.uskcorp.tool.dmt.domain.Technology;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("technologyServiceImpl")
public class TechnologyServiceImpl extends TechnologyService {
	@Autowired
	@Qualifier("technologyDaoImpl")
	TechnologyDAO technologyDAO;

	@Override
	protected APIDAO<Technology> getDao() {
		// TODO Auto-generated method stub
		return technologyDAO;
	}

	
	
}
