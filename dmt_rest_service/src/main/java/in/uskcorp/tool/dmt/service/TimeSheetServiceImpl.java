package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.TimeSheetDAO;
import in.uskcorp.tool.dmt.domain.TimeSheet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("timeSheetServiceImpl")
public class TimeSheetServiceImpl extends TimeSheetService {
	@Autowired
	@Qualifier("timeSheetDaoImpl")
	TimeSheetDAO timeSheetDAO;

	@Override
	protected APIDAO<TimeSheet> getDao() {
		return timeSheetDAO;
	}

}
