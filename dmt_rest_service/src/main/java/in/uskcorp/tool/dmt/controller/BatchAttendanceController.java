package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.BatchAttendance;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.BatchAttendanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.BATCH_ATTENDANCES)
public class BatchAttendanceController extends APIController<BatchAttendance> {
	@Autowired
	@Qualifier("batchAttendanceServiceImpl")
	BatchAttendanceService batchAttendanceService;

	@Override
	protected APIService<BatchAttendance> getService() {
		return batchAttendanceService;
	}

}
