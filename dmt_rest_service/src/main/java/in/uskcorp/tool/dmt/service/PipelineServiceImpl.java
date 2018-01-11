package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.PipelineDAO;
import in.uskcorp.tool.dmt.domain.Pipeline;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("pipelineServiceImpl")
public class PipelineServiceImpl extends PipelineService {

	@Autowired
	@Qualifier("pipelineDaoImpl")
	PipelineDAO pipelineDAO;

	@Override
	protected APIDAO<Pipeline> getDao() {
		return pipelineDAO;
	}

}
