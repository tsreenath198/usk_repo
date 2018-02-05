package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.UserDetails;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.UserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
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
	public @ResponseBody boolean readByValues(
			@RequestBody UserDetails userDetails, BindingResult result) {
		UserDetails user = new UserDetails();
		boolean te = userDetailsService.readByValues(userDetails);
		if (!result.hasFieldErrors()) {

			if (!userDetailsService.readByValues(userDetails)) {
				result.addError(new ObjectError("err", "Invalid Credentials"));
			} else {
				user.setUserName("username" + user.getUserName() + ""
						+ "password" + user.getPassword());
			}
		}
		return te;
	}
}
