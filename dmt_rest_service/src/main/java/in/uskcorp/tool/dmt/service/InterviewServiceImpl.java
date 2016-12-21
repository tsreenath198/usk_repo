package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.InterviewDAO;
import in.uskcorp.tool.dmt.domain.Interview;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("interviewServiceImpl")
public class InterviewServiceImpl extends InterviewService {
	@Autowired
	@Qualifier("interviewDaoImpl")
	InterviewDAO interviewDAO;

	@Override
	protected APIDAO<Interview> getDao() {
		return interviewDAO;
	}

}
