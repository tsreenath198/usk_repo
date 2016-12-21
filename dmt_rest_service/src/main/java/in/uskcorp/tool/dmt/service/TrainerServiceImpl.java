package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.TrainerDAO;
import in.uskcorp.tool.dmt.domain.Trainer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("trainerServiceImpl")
public class TrainerServiceImpl extends TrainerService {
	@Autowired
	@Qualifier("trainerDaoImpl")
	TrainerDAO trainerDAO;

	@Override
	protected APIDAO<Trainer> getDao() {
		return trainerDAO;
	}

}
