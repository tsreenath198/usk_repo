package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.domain.UserDetails;

public abstract class UserDetailsService extends APIService<UserDetails>{
	public abstract UserDetails readByValues(String username,String password);
}
