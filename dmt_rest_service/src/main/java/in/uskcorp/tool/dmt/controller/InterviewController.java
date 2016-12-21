package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Interview;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.InterviewService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.INTERVIEWS)
public class InterviewController extends APIController<Interview> {
	@Autowired
	@Qualifier("interviewServiceImpl")
	InterviewService interviewService;

	@Override
	protected APIService<Interview> getService() {
		return interviewService;
	}

}
