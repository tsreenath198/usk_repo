package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.TraineeDAO;
import in.uskcorp.tool.dmt.domain.Trainee;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("traineeServiceImpl")
public class TraineeServiceImpl extends TraineeService {
	@Autowired
	@Qualifier("traineeDaoImpl")
	TraineeDAO traineeDAO;

	@Override
	protected APIDAO<Trainee> getDao() {
		return traineeDAO;
	}

}
