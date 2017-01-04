package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.ResumeDAO;
import in.uskcorp.tool.dmt.domain.Resume;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("resumeServiceImpl")
public class ResumeServiceImpl extends ResumeService {

	@Autowired
	@Qualifier("resumeDaoImpl")
	ResumeDAO resumeDAO;

	@Override
	protected APIDAO<Resume> getDao() {
		return resumeDAO;
	}

}
