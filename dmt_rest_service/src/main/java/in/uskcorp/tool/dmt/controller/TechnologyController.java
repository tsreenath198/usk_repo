package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Technology;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TechnologyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TECHNOLOGIES)
public class TechnologyController extends APIController<Technology> {
	@Autowired
	@Qualifier("technologyServiceImpl")
	TechnologyService technologyService;

	@Override
	protected APIService<Technology> getService() {
		return technologyService;
	}

}
