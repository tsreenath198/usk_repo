package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TraineeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TRAINEES)
public class TraineeController extends APIController<Trainee> {
	@Autowired
	@Qualifier("traineeServiceImpl")
	TraineeService traineeService;

	@Override
	protected APIService<Trainee> getService() {
		return traineeService;
	}

}
