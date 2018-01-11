package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.TimeSheet;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.TimeSheetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.TIME_SHEETS) 
public class TimeSheetController extends APIController<TimeSheet> {
	@Autowired
	@Qualifier("timeSheetServiceImpl")
	TimeSheetService timeSheetService;

	@Override
	protected APIService<TimeSheet> getService() {
		return timeSheetService;
	}

}
