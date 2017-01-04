package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.UserDetails;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.UserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(DMTRestURIConstants.USERDETAILS)
public class UserDetailsController extends APIController<UserDetails> {

	@Autowired
	@Qualifier("userDetailsServiceImpl")
	UserDetailsService userDetailsService;

	@Override
	protected APIService<UserDetails> getService() {
		return userDetailsService;

	}

	@RequestMapping(value = DMTRestURIConstants.READ_BY_VALUES, method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ResponseEntity<String> readByValues(
			@RequestBody UserDetails userDetails) {
		try {
			userDetailsService.readByValues(userDetails.getUserName(),
					userDetails.getPassword());
			return new ResponseEntity<String>(HttpStatus.OK);

		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<String>(HttpStatus.SERVICE_UNAVAILABLE);

		}
	}
}
