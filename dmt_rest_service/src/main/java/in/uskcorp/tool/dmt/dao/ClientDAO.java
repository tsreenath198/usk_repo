package in.uskcorp.tool.dmt.dao;

import in.uskcorp.tool.dmt.domain.Client;

import java.util.List;

public abstract class ClientDAO extends APIDAO<Client> {

	public abstract Long getLastId();
	//public abstract List<Client> getSummary();
}
