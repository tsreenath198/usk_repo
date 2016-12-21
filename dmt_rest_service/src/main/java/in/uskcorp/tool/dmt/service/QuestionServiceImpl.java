package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.QuestionDAO;
import in.uskcorp.tool.dmt.domain.Question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("questionServiceImpl")
public class QuestionServiceImpl extends QuestionService {
	@Autowired
	@Qualifier("questionDaoImpl")
	QuestionDAO questionDAO;

	@Override
	protected APIDAO<Question> getDao() {
		return questionDAO;
	}

}
