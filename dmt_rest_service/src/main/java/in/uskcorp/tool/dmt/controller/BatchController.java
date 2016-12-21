package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Batch;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.BatchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.BATCHES)
public class BatchController extends APIController<Batch> {
	@Autowired
	@Qualifier("batchServiceImpl")
	BatchService batchService;

	@Override
	protected APIService<Batch> getService() {
		return batchService;
	}
	
}
