package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Trainee;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TraineeService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

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
	
	@RequestMapping(value = DMTRestURIConstants.READ_ALL_BY_Id, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody
	ResponseEntity<List<Trainee>> readAllById(@RequestParam Integer id) {
		try {
			List<Trainee> list = traineeService.readAllById(id);
			return new ResponseEntity<List<Trainee>>(list, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<List<Trainee>>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

}
