package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Pipeline;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.PipelineService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.PIPELINES)
public class PipelineController extends APIController<Pipeline> {

	@Autowired
	@Qualifier("pipelineServiceImpl")
	PipelineService pipelineService;

	@Override
	protected APIService<Pipeline> getService() {
		return pipelineService;
	}

}
