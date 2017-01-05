package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.DashboardSummary;
import in.uskcorp.tool.dmt.service.DashboardSummaryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(DMTRestURIConstants.DASHBOARD_SUMMARY)
public class DashboardController {

	@Autowired
	@Qualifier("dashboardSummaryServiceImpl")
	DashboardSummaryService dashboardSummaryService;

	@RequestMapping(value = DMTRestURIConstants.READ_ALL, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<DashboardSummary> readAll() {
		try {		
			DashboardSummary summary = dashboardSummaryService
					.getDashboardSummary();
			return new ResponseEntity<DashboardSummary>(summary, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<DashboardSummary>(
					HttpStatus.SERVICE_UNAVAILABLE);
		}
	}
	

}
