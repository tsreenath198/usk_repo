package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.BatchAttendanceDAO;
import in.uskcorp.tool.dmt.domain.BatchAttendance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("batchAttendanceServiceImpl")
public class BatchAttendanceServiceImpl extends BatchAttendanceService {
	@Autowired
	@Qualifier("batchAttendanceDAOImpl")
	BatchAttendanceDAO batchAttendanceDAO;

	@Override
	protected APIDAO<BatchAttendance> getDao() {
		return batchAttendanceDAO;
	}

}
