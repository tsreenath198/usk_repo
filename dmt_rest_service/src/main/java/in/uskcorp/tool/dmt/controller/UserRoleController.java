package in.uskcorp.tool.dmt.controller;

import in.uskcorp.tool.dmt.domain.UserRole;
import in.uskcorp.tool.dmt.service.APIService;
import in.uskcorp.tool.dmt.service.UserRoleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(DMTRestURIConstants.USER_ROLES)
public class UserRoleController extends APIController<UserRole> {
	@Autowired
	@Qualifier("userRoleServiceImpl")
	UserRoleService userRoleService;

	@Override
	protected APIService<UserRole> getService() {
		return userRoleService;
	}
}
