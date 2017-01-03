package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.BatchDAO;
import in.uskcorp.tool.dmt.domain.Batch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("batchServiceImpl")
public class BatchServiceImpl extends BatchService {
	
	@Autowired
	@Qualifier("batchDAOImpl")
	BatchDAO batchDAO;

	@Override
	protected APIDAO<Batch> getDao() {
		return batchDAO;
	}

}
