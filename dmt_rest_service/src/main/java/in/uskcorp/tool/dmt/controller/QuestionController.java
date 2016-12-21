package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Question;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.QuestionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.QUESTIONS)
public class QuestionController extends APIController<Question> {
	@Autowired
	@Qualifier("questionServiceImpl")
	QuestionService questionService;

	@Override
	protected APIService<Question> getService() {
		return questionService;
	}

}
