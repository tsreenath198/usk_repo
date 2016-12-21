package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Attendance;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.ATTENDANCES)
public class AttendanceController extends APIController<Attendance> {
	@Autowired
	@Qualifier("attendanceServiceImpl")
	AttendanceService attendanceService;

	@Override
	protected APIService<Attendance> getService() {
		return attendanceService;
	}

}
