package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.Payroll;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.PayrollService;
import in.uskcorp.tool.dmt.util.ResultSetUtil;

import java.util.Calendar;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(DMTRestURIConstants.PAYROLL)
public class PayrollController extends APIController<Payroll> {
	@Autowired
	@Qualifier("payrollServiceImpl")
	PayrollService payrollService;

	@Override
	protected APIService<Payroll> getService() {
		return payrollService;
	}

	@RequestMapping(value = DMTRestURIConstants.READ_BY_VALUES, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Payroll> readByValues(
			@RequestParam Integer employeeId) {
		try {
			Payroll pay = payrollService.readByValues(employeeId);
			return new ResponseEntity<Payroll>(pay, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Payroll>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

	@RequestMapping(value = DMTRestURIConstants.READ_BY_MONTH_AND_ID, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<Payroll> readByMonthAndId(
			@RequestBody Payroll payroll) {
		try {
			Date fromDate = getFirstDateOfMonth(ResultSetUtil
					.converttoUtilDate(payroll.getDate()));
			Date toDate = getLastDateOfMonth(ResultSetUtil
					.converttoUtilDate(payroll.getDate()));
			Payroll pay = payrollService.readByMonthAndId(
					payroll.getEmployeeId(), fromDate, toDate);
			return new ResponseEntity<Payroll>(pay, HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<Payroll>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}

	public static Date getFirstDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH,
				cal.getActualMinimum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}

	public static Date getLastDateOfMonth(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.set(Calendar.DAY_OF_MONTH,
				cal.getActualMaximum(Calendar.DAY_OF_MONTH));
		return cal.getTime();
	}
}
