package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.BatchAttendanceDAO;
import in.uskcorp.tool.dmt.dao.TraineeDAO;
import in.uskcorp.tool.dmt.domain.BatchAttendance;
import in.uskcorp.tool.dmt.domain.Trainee;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("batchAttendanceServiceImpl")
public class BatchAttendanceServiceImpl extends BatchAttendanceService {
	@Autowired
	@Qualifier("batchAttendanceDaoImpl")
	BatchAttendanceDAO batchAttendanceDAO;

	@Autowired
	@Qualifier("traineeDaoImpl")
	TraineeDAO traineeDAO;

	@Override
	protected APIDAO<BatchAttendance> getDao() {
		return batchAttendanceDAO;
	}

	/*@Override
	public List<BatchAttendance> findTraineeId(BatchAttendance a) {
		
		List<BatchAttendance> batchAttendance=new ArrayList<BatchAttendance>();
		batchAttendance.setTraineeId(a.getTraineeId());
		return batchAttendance;
}*/
	} 