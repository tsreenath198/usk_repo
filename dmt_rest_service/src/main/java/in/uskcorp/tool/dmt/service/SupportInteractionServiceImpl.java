package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.SupportInteractionDAO;
import in.uskcorp.tool.dmt.domain.SupportInteraction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("supportInteractionServiceImpl")
public class SupportInteractionServiceImpl extends SupportInteractionService {

	@Autowired
	@Qualifier("supportInteractionDaoImpl")
	SupportInteractionDAO supportInteractionDAO;

	@Override
	protected APIDAO<SupportInteraction> getDao() {
		return supportInteractionDAO;
	}
}