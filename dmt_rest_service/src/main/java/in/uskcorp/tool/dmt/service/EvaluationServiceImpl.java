package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.EvaluationDAO;
import in.uskcorp.tool.dmt.domain.Evaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("evaluationServiceImpl")
public class EvaluationServiceImpl extends EvaluationService {
	@Autowired
	@Qualifier("evaluationDaoImpl")
	EvaluationDAO evaluationDAO;

	@Override
	protected APIDAO<Evaluation> getDao() {
		return evaluationDAO;
	}

}
