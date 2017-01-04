package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Resume;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.ResumeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.RESUMES)
public class ResumeController extends APIController<Resume>{

	@Autowired
	@Qualifier("resumeServiceImpl")
	ResumeService resumeService;

	@Override
	protected APIService<Resume> getService() {
		return resumeService;
	}

}
