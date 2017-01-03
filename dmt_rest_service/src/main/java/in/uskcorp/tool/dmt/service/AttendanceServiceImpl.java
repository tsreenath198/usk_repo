package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.AttendanceDAO;
import in.uskcorp.tool.dmt.domain.Attendance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("attendanceServiceImpl")
public class AttendanceServiceImpl extends AttendanceService {
	@Autowired
	@Qualifier("attendanceDAOImpl")
	AttendanceDAO attendanceDAO;

	@Override
	protected APIDAO<Attendance> getDao() {
		return attendanceDAO;
	}

}
