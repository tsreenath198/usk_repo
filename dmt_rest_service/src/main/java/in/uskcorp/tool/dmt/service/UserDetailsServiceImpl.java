package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.UserDetailsDAO;
import in.uskcorp.tool.dmt.domain.UserDetails;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("userDetailsServiceImpl")
public class UserDetailsServiceImpl extends UserDetailsService {

	@Autowired
	@Qualifier("userDetailsDaoImpl")
	UserDetailsDAO userDetailsDAO;

	@Override
	protected APIDAO<UserDetails> getDao() {
		// TODO Auto-generated method stub
		return userDetailsDAO;
	}

	@Override
	public UserDetails readByValues(String username, String password) {
		return userDetailsDAO.readByValues(username,password);
	}

	
	
}
