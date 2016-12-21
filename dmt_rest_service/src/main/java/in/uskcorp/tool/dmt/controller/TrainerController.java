package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Trainer;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TrainerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TRAINERS)
public class TrainerController extends APIController<Trainer> {
	@Autowired
	@Qualifier("trainerServiceImpl")
	TrainerService trainerService;

	@Override
	protected APIService<Trainer> getService() {
		return trainerService;
	}

}
