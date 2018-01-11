package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Evaluation;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.EvaluationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.EVALUATION)
public class EvaluationController extends APIController<Evaluation> {
	@Autowired
	@Qualifier("evaluationServiceImpl")
	EvaluationService evaluationService;

	@Override
	protected APIService<Evaluation> getService() {
		return evaluationService;
	}

}
