package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.UserRoleDAO;
import in.uskcorp.tool.dmt.domain.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("userRoleServiceImpl")
public class UserRoleServiceImpl extends UserRoleService {
	@Autowired
	@Qualifier("userRoleDaoImpl")
	UserRoleDAO userRoleDAO;

	@Override
	protected APIDAO<UserRole> getDao() {
		return userRoleDAO;
	}
}
