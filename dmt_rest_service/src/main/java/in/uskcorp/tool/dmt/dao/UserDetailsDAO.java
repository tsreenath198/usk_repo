package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.UserDetails;

public abstract class UserDetailsDAO extends APIDAO<UserDetails> {
	public abstract UserDetails readByValues(String username,String password);
}
