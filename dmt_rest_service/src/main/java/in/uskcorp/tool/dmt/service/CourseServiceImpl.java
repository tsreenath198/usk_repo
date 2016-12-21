package in.uskcorp.tool.dmt.service;

import in.uskcorp.tool.dmt.dao.APIDAO;
import in.uskcorp.tool.dmt.dao.CourseDAO;
import in.uskcorp.tool.dmt.domain.Course;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service("courseServiceImpl")
public class CourseServiceImpl extends CourseService {
	@Autowired
	@Qualifier("courseDaoImpl")
	CourseDAO courseDAO;

	@Override
	protected APIDAO<Course> getDao() {
		return courseDAO;
	}

}
