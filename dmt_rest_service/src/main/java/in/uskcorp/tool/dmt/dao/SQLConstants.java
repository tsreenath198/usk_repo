package in.uskcorp.tool.dmt.dao;

public class SQLConstants {
	public static final String CONTACT_SELECT = "SELECT * FROM contact";
	public static final String CLIENT_SELECT_DROPDOWN = "select name,id from client ORDER BY name asc ";
	public static final String BATCH_SELECT_DROPDOWN = "select id as 'name',id from batch ORDER BY id asc ";
	public static final String TECHNOLOGY_SELECT_DROPDOWN = "select name,id from technology ORDER BY id asc ";
	public static final String INTERVIEW_SELECT_DROPDOWN = "select name as 'id',name from interview ORDER BY name asc ";
	public static final String EMPLOYEE_SELECT_DROPDOWN = "select name,id from employee ORDER BY id asc ";
	public static final String TRAINER_SELECT_DROPDOWN = "select name,id from trainer ORDER BY name asc ";
	public static final String TRAINEE_SELECT_DROPDOWN = "select name,id from trainee ORDER BY name asc ";

	public static final String ATTENDANCE_INSERT = "INSERT INTO attendance(batch_id,trainee_id,date,status,create_date,update_date) VALUES (?,?,?,?,?,?)";
	public static final String ATTENDANCE_SELECT = "SELECT `id`, `batchid`, `trainerid`, `date`, `status`, `create_date`, `update_date` FROM `attendance` WHERE status=0";
	public static final String ATTENDANCE_DELETE = "UPDATE attendance set  active_flag=1 WHERE id = ?";
	public static final String ATTENDANCE_UPDATE = "UPDATE attendance set batch_id =?,trainee_id =?,date =?,status =?,update_date =? WHERE id = ?";
	public static final String ATTENDANCE_SELECT_BY_ID = "SELECT * FROM attendance where id = ?";

	public static final String SUPPORT_TRACKER_SELECT = "SELECT s.*,te.name as trainee_name,e.name as employee_name FROM support_tracker s,trainee te,employee e WHERE s.support_by=e.id AND s.support_to=te.id order by s.id desc";
	public static final String SUPPORT_TRACKER_INSERT = "INSERT INTO support_tracker(support_by, support_to, date,hours, description) VALUES (?,?,?,?,?)";
	public static final String SUPPORT_TRACKER_DELETE = "DELETE FROM support_tracker  WHERE id = ?";
	public static final String SUPPORT_TRACKER_UPDATE = "UPDATE support_tracker set support_by = ?,  support_to =?,date =?,hours =?, description =? WHERE id = ?";
	public static final String SUPPORT_TRACKER_SELECT_BY_ID = "SELECT * FROM support_tracker where id = ?";

	public static final String OPPURTINITY_TRACKER_SELECT = "SELECT ot.id as id, type ,paid,category, e.name as provided_by,CASE type"
			+ " WHEN 'Trainee' THEN (select name from trainee te where ot.`provided_for` = te.id)"
			+ " WHEN 'Trainer' THEN (select name from trainer tr where ot.`provided_for` = tr.id)"
			+ " WHEN 'Employee' THEN (select name from employee emp where ot.`provided_for` = emp.id)"
			+ " WHEN 'Client' THEN (select name from client cl where ot.`provided_for` = cl.id)END AS provided_for,date"
			+ " FROM opportunity_tracker ot , employee e where e.id = ot.provided_by ORDER BY date desc";
	public static final String OPPURTINITY_TRACKER_INSERT = "INSERT INTO opportunity_tracker(type,provided_by,provided_for,date,category,paid) values(?,?,?,?,?,?)";
	public static final String OPPURTINITY_TRACKER_DELETE = "DELETE FROM opportunity_tracker  WHERE id = ?";
	public static final String OPPURTINITY_TRACKER_UPDATE = "UPDATE opportunity_tracker set type= ?, provided_by=?, provided_for=?, date=?, category=? ,paid=? WHERE id = ?";
	public static final String OPPURTINITY_TRACKER_SELECT_BY_ID = "SELECT * FROM  opportunity_tracker where id = ?";

	public static final String SUPPORT_GROUP_BY_TRAINEE_ID = "SELECT `trainee_id`,count(`trainee_id`) as totalCount FROM `support` group by `trainee_id`";

	public static final String TECHNOLOGY_SELECT = "SELECT * FROM technology where active_flag=0 ORDER BY name asc";
	public static final String TECHNOLOGY_INSERT = "INSERT INTO technology (name,created_date,description) values(?,?,?)";
	public static final String TECHNOLOGY_DELETE = "UPDATE technology set  active_flag=1 WHERE id = ?";
	public static final String TECHNOLOGY_UPDATE = "UPDATE technology set name = ?,  updated_date =?, description =? WHERE id = ?";
	public static final String TECHNOLOGY_SELECT_BY_ID = "SELECT * FROM technology where id = ?";

	public static final String USER_SELECT = "SELECT * FROM user_creds where active_flag=0 ORDER BY username asc";
	public static final String USER_INSERT = "INSERT INTO user_creds (username,firstname,lastname,email,phoneno,password,role,description) values(?,?,?,?,?,?,?,?)";
	public static final String USER_DELETE = "UPDATE user_creds set  active_flag=1 WHERE id = ?";
	public static final String USER_UPDATE = "UPDATE user_creds set username=?,firstname=?,lastname=?,email=?,phoneno=?,password=?,role=?,description=?  WHERE id = ?";
	public static final String USER_SELECT_BY_ID = "SELECT * FROM user_creds where id = ?";

	public static final String TRAINER_SELECT = "SELECT t.*, t.`technology_id` as 'technology',t.`referred_by` as 'employee',"
			+ " te.name as technology_name,e.name as employee_name FROM trainer t, technology te ,employee e WHERE "
			+ "t.technology_id= te.id AND t.`referred_by` = e.id UNION "
			+ "SELECT t.*, t.`technology_id` as 'technology',t.`referred_by` as 'employee', te.name as technology_name,'' as employee_name"
			+ " FROM trainer t, technology te WHERE t.technology_id= te.id";
	public static final String TRAINER_INSERT = "INSERT INTO trainer (name,referred_by, technology_id,phone,email,created_date,description) values(?, ?,?, ?,?,?,?)";
	public static final String TRAINER_DELETE = "DELETE FROM trainer  WHERE id = ?";
	public static final String TRAINER_UPDATE = "UPDATE trainer set name=?,referred_by=?, technology_id=?,phone=?,email=?,updated_date=?,description=? WHERE id = ?";
	public static final String TRAINER_SELECT_BY_ID = "SELECT * FROM trainer where id = ?";
	public static final String TRAINER_SELECT_BY_TECHNOLOGYID = "SELECT t.*,te.name as technology_name  FROM  trainer t, technology te WHERE t.technology_id= te.id AND t.technology_id = ? order by t.name asc";

	public static final String INVOICE_SELECT = "SELECT * FROM invoice ORDER BY invoice_date asc";
	public static final String INVOICE_INSERT = "INSERT INTO invoice (invoice_date,invoice_type,actual_amount,received_amount,received_date,created_date,description) values(?,?,?,?,?,?,?)";
	public static final String INVOICE_DELETE = "UPDATE invoice set active_flag=1 WHERE id = ?";
	public static final String INVOICE_UPDATE = "UPDATE invoice set invoice_date=?,invoice_type=?,actual_amount=?,received_amount=?,received_date=?,updated_date=?,description=? WHERE id = ?";
	public static final String INVOICE_SELECT_BY_ID = "SELECT * FROM invoice where id = ?";

	public static final String EMPLOYEE_SELECT = "SELECT * FROM employee where active_flag=0 ORDER BY name asc";
	public static final String EMPLOYEE_INSERT = "INSERT INTO employee (name,phone,email,role,base_salary,created_date,description) values(?,?,?,?,?,?,?)";
	public static final String EMPLOYEE_DELETE = "UPDATE employee set active_flag=1 WHERE id = ?";
	public static final String EMPLOYEE_UPDATE = "UPDATE employee set name=?,phone=?,email=?,role=?,base_salary=?,updated_date=?,description=? WHERE id = ?";
	public static final String EMPLOYEE_SELECT_BY_ID = "SELECT * FROM employee where id = ?";

	public static final String EMPLOYEE_ATTENDANCE_SELECT = "SELECT * FROM employee_attendence";
	public static final String EMPLOYEE_ATTENDANCE_INSERT = "INSERT INTO employee_attendence(employee_id, employee_name, date, created_date, updated_date, in_time, out_time) VALUES (?,?,?,?,?,?,?)";
	public static final String EMPLOYEE_ATTENDANCE_DELETE = "UPDATE employee_attendence set active_flag=1 WHERE id = ?";
	public static final String EMPLOYEE_ATTENDANCE_UPDATE = "UPDATE employee_attendence SET employee_id=?,employee_name=?,date=?,created_date=?,updated_date=?,in_time=?,out_time=? WHERE id=?";
	public static final String EMPLOYEE_ATTENDANCE_SELECT_BY_ID = "SELECT * FROM employee_attendence where id = ?";

	public static final String RESUME_SELECT = "SELECT r.*,tr.name as traineename,e.name as employee_name,trainee_id as 'trainee_id',prepared_by as 'employee',paid as 'paidStatus',r.`date` as 'createdate',r.`date` as 'updateddate',r.`received_status` as 'receivedStatus' FROM resume r,trainee tr,employee e WHERE r.trainee_id=tr.id AND r.prepared_by=e.id ORDER BY r.id desc";
	public static final String RESUME_INSERT = "INSERT INTO resume (trainee_id, prepared_by,paid,date,created_date,received_status, description) values(?,?,?,?,?,?,?)";
	public static final String RESUME_DELETE = "DELETE FROM resume  WHERE id = ?";
	public static final String RESUME_UPDATE = "UPDATE resume set trainee_id=?,prepared_by=?,paid=?, date=?,updated_date=?, received_status=?, description=? WHERE id = ?";
	public static final String RESUME_SELECT_BY_ID = "SELECT * FROM resume where id = ?";

	public static final String PIPELINE_SELECT = "SELECT p.* FROM pipeline p ORDER BY p.id DESC";
	public static final String PIPELINE_INSERT = "INSERT INTO pipeline (candidate_name,phone,email,requirements,created_date,description) values(?,?,?,?,?,?)";
	public static final String PIPELINE_DELETE = "DELETE FROM pipeline  WHERE id = ?";
	public static final String PIPELINE_UPDATE = "UPDATE pipeline set candidate_name=?,phone=?,email=?,requirements=?,updated_date=?,description=?WHERE id = ?";
	public static final String PIPELINE_SELECT_BY_ID = "SELECT * FROM pipeline where id = ?";

	public static final String SALARY_SELECT = "SELECT s.*,e.name  as 'employee_name' ,s.employee_id as 'employee',`month` as 'month' FROM `salary` s , employee e where s.employee_id = e.id ORDER BY s.id DESC";
	public static final String SALARY_INSERT = "INSERT INTO salary (employee_id,month,year,salary,created_date,description) values(?,?,?,?,?,?)";
	public static final String SALARY_DELETE = "DELETE FROM salary  WHERE id = ?";
	public static final String SALARY_UPDATE = "UPDATE salary set employee_id=?,month=?,year=?,salary=?,updated_date=?,description=?WHERE id = ?";
	public static final String SALARY_SELECT_BY_ID = "SELECT * FROM salary where id = ?";

	public static final String TRAINEE_SELECT = "SELECT tr.*,tr.client_id as client, cl.name as client_name,alternate_phone as 'alternatephone',"
			+ "skype_id as 'skype',technology_id as 'technology', trainee_fee_status as 'feeStatus',batch_id as 'batch',`received_status` as 'receivedStatus',"
			+ "`paid_status` as 'paidStatus',te.name as technology_name FROM trainee tr, client cl, technology te WHERE tr.active_flag=0 AND "
			+ "tr.client_id = cl.id and tr.technology_id = te.id order by tr.created_date DESC";
	public static final String TRAINEE_INSERT = "INSERT INTO trainee (name, email,alternate_phone,client_id,skype_id,timezone,batch_id,created_date,"
			+ "description,phone,trainee_fee_status,paid_status,received_status,technology_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	public static final String TRAINEE_DELETE = "UPDATE trainee  set active_flag=1  WHERE id = ?";
	public static final String TRAINEE_UPDATE = "UPDATE trainee set name=?, email=?,alternate_phone=?,client_id=?,skype_id=?,timezone=?,"
			+ "batch_id=?,updated_date=?,description=?,phone=?,trainee_fee_status=?,paid_status=?,received_status=?,technology_id=? WHERE id = ?";
	public static final String TRAINEE_SELECT_BY_ID = "SELECT * FROM trainee where id = ?";
	public static final String TRAINEE_SELECT_BY_BATCHID = "SELECT tr.*,tr.name AS 'name',"
			+ "cl.name AS 'client_name','' as 'technology_name' FROM trainee tr,client cl  where tr.client_id = cl.id AND tr.active_flag=0 AND  tr.batch_id = ?";

	public static final String CLIENT_SELECT = "select c.*,group_concat(co.id) AS poc_ids ,group_concat(co.poc) AS poc, "
			+ "group_concat(CONCAT(co.poc,'('),CONCAT(co.designation,')'),CONCAT(co.phone,'\n')) AS contacts, "
			+ "group_concat(co.designation) AS des, group_concat(co.phone) AS phone,group_concat(co.email) AS email from client c,"
			+ " contact co where c.id= co.client_id AND c.active_flag=0 Group By co.client_id ORDER BY id desc";
	public static final String CLIENT_INSERT = "INSERT INTO client (name, address,created_date,description) values(?, ?, ?,?)";
	public static final String CLIENT_DELETE = "UPDATE client set active_flag=1   WHERE id = ?";
	public static final String CLIENT_UPDATE = "UPDATE client set name=?, address=?,updated_date=?,description=? WHERE id = ?";
	public static final String CLIENT_SELECT_BY_ID = "SELECT * FROM client where id = ?";

	public static final String CONTACT_INSERT = "INSERT INTO contact (client_id,poc,email,phone,designation,created_date) values(?,?,?,?,?,?)";
	public static final String CONTACT_DELETE = "DELETE FROM contact  WHERE id = ?";
	public static final String CONTACT_UPDATE = "UPDATE contact set client_id=?,poc=?,email=?,phone=?,updated_date=?,designation=? WHERE id = ?";
	public static final String CONTACT_SELECT_BY_ID = "SELECT * FROM contact where client_id = ?";

	public static final String COURSE_SELECT = "SELECT c.*,c.est_hrs as 'estimatedhours',c.technology_id as technology,te.name as technology_name "
			+ "FROM  course c, technology te WHERE c.active_flag=0 AND c.technology_id= te.id  order by c.id DESC";
	public static final String COURSE_INSERT = "INSERT INTO course (technology_id,name,est_hrs,created_date,description) values(?,?,?,?,?)";
	public static final String COURSE_DELETE = "UPDATE course set active_flag=1 WHERE id = ?";
	public static final String COURSE_UPDATE = "UPDATE course set technology_id=?,name=?,est_hrs=?,updated_date=?,description=? WHERE id = ?";
	public static final String COURSE_SELECT_BY_ID = "SELECT * FROM course where id = ?";

	public static final String BATCH_SELECT = "SELECT b.*,t.name as technology_name, tr.name as trainer_name FROM batch b,"
			+ " technology t, trainer tr WHERE b.active_flag=0 AND b.technology_id = t.id and b.trainer_id = tr.id"
			+ " order by b.created_date DESC";
	public static final String BATCH_INSERT = "INSERT INTO batch (technology_id,trainer_id,start_date,end_date,duration,status,paid_status,received_status,created_date,description,time,invoice) values(?, ?,?,?,?,?,?,?,?,?,?,?)";
	public static final String BATCH_DELETE = "UPDATE batch set active_flag=1 WHERE id = ?";
	public static final String BATCH_UPDATE = "UPDATE batch set  technology_id=?,trainer_id=?,start_date=?,end_date=?,duration=?,status=?,paid_status=?,received_status=?,updated_date=?,description=?,time=?,invoice=? WHERE id = ?";
	public static final String BATCH_SELECT_BY_ID = "SELECT * FROM batch where id = ?";
	public static final String BATCH_DASHBOARD = "SELECT b.id as 'batchId' , tr.name as 'trainername', tech.name as 'technology',count(tre.id) as 'numberOfStudents' FROM batch b, technology tech , trainer tr,trainee tre where b.trainer_id = tr.id AND b.technology_id = tech.id"
			+ " AND tre.batch_id = b.id AND YEAR(b.start_date) = YEAR(CURRENT_DATE - INTERVAL 0 MONTH) AND MONTH(b.start_date) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) GROUP BY b.id";
	public static final String BATCH_DASHBOARD_YEAR = "SELECT b.id as 'batchId' , tr.name as 'name', tech.name as 'technologyName',count(tre.id) as 'noofStudent' FROM batch b, technology tech , "
			+ "trainer tr,trainee tre where b.trainer_id = tr.id AND b.technology_id = tech.id AND tre.batch_id = b.id AND (b.start_date BETWEEN ? AND ?) GROUP BY b.id";

	public static final String TODOSELECT = "SELECT t.*, e.name as employee_name,t.assigned_to as 'employee',t.estimated_time as 'estimateddays',"
			+ "t.status as 'feeStatus' FROM todo t, employee e  WHERE t.assigned_to= e.id AND t.active_flag=0 order by t.created_date DESC";
	public static final String TODO_INSERT = "INSERT INTO todo (category,task_date, status, assigned_to,estimated_time,created_date,description) values(?,?,?,?,?,?,?)";
	public static final String TODO_DELETE = "UPDATE todo set active_flag=1  WHERE id = ?";
	public static final String TODO_UPDATE = "UPDATE todo set  category=?,task_date=?,status=?,assigned_to=?,estimated_time=?,updated_date=?,description=? WHERE id = ?";
	public static final String TODO_SELECT_BY_ID = "SELECT * FROM todo where id = ?";

	public static final String INTERVIEW_SELECT = "SELECT i.*, c.name as client_name, tr.name as trainee_name,tech.name as technology,e.name as employee_name,trainee_id as 'trainee',assisted_by as 'employee',"
			+ "status as 'feeStatus',i.`received_status` as 'receivedStatus',i.`paid_status` as 'paidStatus',time as 'timezone',date as'interviewCreate' FROM interview i, client c, "
			+ "trainee tr,employee e,technology tech WHERE i.client_id = c.id and i.trainee_id = tr.id and i.assisted_by=e.id AND tr.technology_id = tech.id AND "
			+ "i.status !='7 - Closed' order by i.created_date desc";
	public static final String INTERVIEW_SELECT_INCLUDE = "SELECT i.*, c.name as client_name, tr.name as trainee_name,"
			+ "tech.name as technology,e.name as employee_name FROM interview i, client c, trainee tr,employee e,technology tech "
			+ "WHERE i.client_id = c.id and i.trainee_id = tr.id and i.assisted_by=e.id AND tr.technology_id = tech.id AND "
			+ "i.status = '7 - Closed' order by i.created_date desc";
	public static final String INTERVIEW_INSERT = "INSERT INTO interview ( trainee_id, assisted_by, client_id, interviewer, time, status, created_date,paid_status,received_status, description, date) values(?,?,?, ?,?,?,?,?,?,?,?)";
	public static final String INTERVIEW_DELETE = "DELETE FROM interview  WHERE id = ?";
	public static final String INTERVIEW_UPDATE = "UPDATE interview set  trainee_id=?, assisted_by=?, client_id=?, interviewer=?, time=?, status=?,  updated_date=?,paid_status=?,received_status=?, description=?, date=? WHERE id = ?";
	public static final String INTERVIEW_SELECT_BY_ID = "SELECT * FROM interview where id = ?";

	public static final String QUESTION_SELECT = "SELECT q.*  FROM question q order by q.id DESC";
	public static final String QUESTION_INSERT = "INSERT INTO question (end_client, question,answers,created_date,description) values(?,?,?,?,?)";
	public static final String QUESTION_DELETE = "DELETE FROM question  WHERE id = ?";
	public static final String QUESTION_UPDATE = "UPDATE question set  end_client=?,question=?,answers=?,updated_date=?,description=? WHERE id = ?";
	public static final String QUESTION_SELECT_BY_ID = "SELECT * FROM question where id = ?";

	public static final String SUPPORT_SELECT = "SELECT s.*,tr.name as trainee_name,tr.id as trainee_id , tra.name as trainer_name, e.name as employee_name FROM support s,"
			+ "trainee tr,employee e, trainer tra WHERE s.trainee_id=tr.id AND s.supported_by=e.id order by tr.id desc, s.id desc ";
	public static final String SUPPORT_INSERT = "INSERT INTO support ( trainee_id, supported_by, trainer_id,start_date, end_date, allotted_time, end_client, status,paid_status,received_status, technology_used, created_date,description,paid_by) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	public static final String SUPPORT_DELETE = "DELETE FROM support  WHERE id = ?";
	public static final String SUPPORT_UPDATE = "UPDATE support set trainee_id=?,supported_by=?,trainer_id=?,start_date=?,end_date=?,allotted_time=?,end_client=?,status=?,paid_status=?,received_status=?,technology_used=?,updated_date=?,description=?,paid_by=? WHERE id = ?";
	public static final String SUPPORT_SELECT_BY_ID = "SELECT * FROM support where id = ?";

	public static final String USERCREDS_SELECT = "select * From user_creds where  username=? AND password=?";
	public static final String USERCREDS_INSERT = "INSERT INTO usercreds ( username, password, role) values(?,?,?)";
	public static final String USERCREDS_SELECT_BY_ID = "SELECT * FROM usercreds where id = ?";

	public static final String BATCH_DASHBOARD_WITHOUT_DATE = "SELECT b.id as 'batchId' , tr.name as 'name', tech.name as 'technologyName',count(tre.id) as 'noofStudent' FROM batch b,"
			+ " technology tech , trainer tr,trainee tre where b.trainer_id = tr.id AND b.technology_id = tech.id AND tre.batch_id = b.id  "
			+ "AND (b.status ='2 - In Progress' || b.status ='4 - Paid In Progress')  GROUP BY b.id";
	public static final String SUPPORT_DASHBOARD_WITHOUT_DATE = "SELECT e.name AS 'supportedBy' , tra.name AS 'supportedTo' , s.`start_date` AS 'startedDate' ,s.`technology_used` AS 'technology',"
			+ "s.status AS 'status' FROM support s,employee e,trainee tra,technology t where e.id = s.supported_by AND tra.id = s.`trainee_id` AND (s.status ='2 - In Progress' || s.status ='4 - Paid In Progress') GROUP BY tra.name ";
	public static final String INTERVIEWDASHBOARDWITHOUTDATE = "SELECT i.`date` AS 'date', tra.name AS 'trainee', e.name AS 'supportedBy',i.status AS 'status' FROM `interview` i,employee e,trainee tra WHERE i.`trainee_id` = tra.id "
			+ "AND e.id = i.`assisted_by` AND (i.status ='2 - In Progress' || i.status ='4 - Paid In Progress')  GROUP BY tra.name ";
	public static final String PAYMENT_PENDING_SELECT = "SELECT tr.name as 'name' , cl.name AS client ,'Support' as category , e.name AS assistedBy FROM support s , trainee tr ,client cl,employee e where s.status ='3 - Payment Pending' "
			+ "AND s.trainee_id=tr.id AND cl.id = tr.client_id AND s.supported_by = e.id UNION SELECT tr.name as 'name' ,cl.name AS client ,'Interview' as category , e.name AS assistedBy FROM interview i, trainee tr,client cl,"
			+ "employee e where i.status ='5 - Payment Pending' AND i.trainee_id=tr.id AND cl.id = tr.client_id AND i.assisted_by = e.id UNION SELECT tr.name as 'name',cl.name AS client ,'Training' as category , tr.name AS assistedBy"
			+ " From trainee tr , batch b ,client cl where cl.id= tr.client_id AND b.id = tr.batch_id AND b.status IN (SELECT status from batch b where b.status = '3 - Payment Pending')";

	public static final String SUPPORT_DASHBOARD = "SELECT e.name AS 'supported_by' , tra.name AS 'trainee_name' , s.`start_date` AS 'start_date' ,s.`technology_used` AS 'technology', s.status AS status FROM support s,employee e,trainee tra,technology t where e.id = s.supported_by AND tra.id = s.`trainee_id` AND YEAR(s.start_date) = YEAR(CURRENT_DATE - INTERVAL '?' MONTH) AND MONTH(s.start_date) = MONTH(CURRENT_DATE - INTERVAL '?' MONTH) GROUP BY tra.name";
	public static final String INTERVIEW_DASHBOARD = "SELECT i.`date` AS 'interview_date', tra.name AS 'trainee_name', e.name AS 'supported_By',i.status AS 'status' FROM `interview` i,employee e,trainee tra WHERE i.`trainee_id` = tra.id AND e.id = i.`assisted_by` AND YEAR(i.date) = YEAR(CURRENT_DATE - INTERVAL 0 MONTH) AND MONTH(i.date) = MONTH(CURRENT_DATE - INTERVAL 0 MONTH) GROUP BY tra.name";
	public static final String INTERVIEW_DASHBOARD_YEAR = "SELECT i.`date` AS 'date', tra.name AS 'trainee', e.name AS 'supportedBy',i.status AS 'status' FROM `interview` i,employee e,trainee tra WHERE i.`trainee_id` = tra.id AND e.id = i.`assisted_by` AND (i.date BETWEEN ? AND ?) GROUP BY tra.name ";

	public static final String CLOSE_TRASACTION_CLIENT = "SELECT distinct c.name AS 'client' , count(tre.id) AS 'training' FROM `client` c,trainee tre where c.id = tre.client_id AND "
			+ "tre.`trainee_fee_status` = '5 - Payment Pending' GROUP BY c.name";
	public static final String CLOSE_TRASACTION_SUPPORT = "select cl.name AS 'client',count(s.id) as 'support' from client cl, support s ,trainee tra where s.trainee_id = tra.id "
			+ "AND cl.id = tra.client_id AND s.status ='5 - Closed' AND YEAR(s.start_date) = YEAR(CURRENT_DATE - INTERVAL ? MONTH) AND MONTH(s.start_date) = MONTH(CURRENT_DATE - INTERVAL ? MONTH) GROUP BY cl.name";
	public static final String CLOSE_TRASACTION_INTERVIEW = "select cl.name AS 'client', count(i.id) as 'interview' from client cl, interview i ,trainee tra where i.trainee_id = tra.id AND cl.id = i.client_id "
			+ "AND i.status ='7 - Closed' AND YEAR(i.date) = YEAR(CURRENT_DATE - INTERVAL ? MONTH) AND MONTH(i.date) = MONTH(CURRENT_DATE - INTERVAL ? MONTH) GROUP BY cl.name";

	public static final String CLOSE_TRASACTION_CLIENTYEAR = "SELECT distinct c.name AS 'client' , count(tre.id) AS 'training' FROM `client` c,trainee tre where c.id = tre.client_id AND tre.`trainee_fee_status` = '7 - Closed' GROUP BY c.name";
	public static final String CLOSE_TRASACTION_SUPPORTYEAR = "select cl.name AS 'client',count(s.id) as 'support' from client cl, support s ,trainee tra where s.trainee_id = tra.id AND cl.id = tra.client_id AND s.status ='5 - Closed' AND (s.start_date BETWEEN ? AND ?) GROUP BY cl.name";
	public static final String CLOSE_TRASACTION_INTERVIEWYEAR = "select cl.name AS 'client', count(i.id) as 'interview' from client cl, interview i ,trainee tra where i.trainee_id = tra.id AND cl.id = i.client_id AND i.status ='7 - Closed' AND (i.date BETWEEN ? AND ?) GROUP BY cl.name";

	public static final String TRAINING_PAYMENT = "SELECT tr.id as 'trainee_id' , tr.name AS 'name',cl.name AS 'client_name',b.id as 'batch_id', trainer.name as 'trainer_name' FROM trainee tr,client cl,batch b,trainer trainer where tr.client_id = cl.id AND tr.active_flag=0 AND"
			+ " tr.batch_id = b.id AND trainer.id=b.trainer_id AND tr.trainee_fee_status = '6 - Paid In Progress' AND tr.received_status = 'Received' AND tr.paid_status !='Paid' AND  trainer.id=?";
	public static final String EMPLOYEE_SELECT_FOR_PAYMENT = "SELECT e.id as 'id',e.name as 'name',e.base_salary as 'base_salary',tr.id as 'trainer_id' FROM employee e,trainer tr where e.active_flag=0 AND e.name = tr.name ORDER BY name asc";
	public static final String PREPARATION_PAYMENT = "SELECT i.*, c.name as client_name, tr.name as trainee_name,tech.name as technology,e.name as employee_name FROM interview i, client c, trainee tr,employee e,technology tech WHERE i.client_id = c.id and i.trainee_id = tr.id and i.assisted_by=e.id AND tr.technology_id = tech.id AND i.status = '6 - Paid In Progress' AND i.trainee_id = ? order by i.created_date desc";
	public static final String RESUME_PAYMENT = "SELECT r.*,tr.name as trainee_name,e.name as employee_name,trainee_id as 'trainee',prepared_by as 'employee',paid as 'paidStatus',r.`date` as 'createdate',r.`date` as 'updateddate',r.`received_status` as 'receivedStatus',c.name as 'client_name'FROM resume r,trainee tr,employee e,client c WHERE r.trainee_id=tr.id AND r.prepared_by=e.id AND c.id = tr.client_id "
			+ "AND r.paid !='Paid' AND r.`received_status` = 'Received' AND r.prepared_by = ? ORDER BY r.id desc";

	public static final String SUPPORT_DASHBOARD_YEAR = "SELECT e.name AS 'supportedBy' , tra.name AS 'supportedTo' , s.`start_date` AS 'startedDate' ,"
			+ "s.`technology_used` AS 'technology' FROM support s,employee e,trainee tra,technology t where e.id = s.supported_by AND tra.id = s.`trainee_id` AND (s.start_date BETWEEN ? AND ?) GROUP BY s.start_date,s.technology_used";
	public static final String SUPPORT_PAYMENT = "SELECT *, count(re.trainee_id) as 'count' from (SELECT distinct s.id as 'support_id',s.start_date as 'start_date',s.end_date as 'end_date',te.name as 'trainee_name' ,te.id as 'trainee_id' FROM support s, trainee te, support_interaction si where te.id = si.trainee_id and  te.id = s.trainee_id AND s.status = '6 - Paid In Progress' AND s.supported_by = ?) as re group by re.trainee_id";
	public static final String SUPPORT_INTERACTION_CREATE = "INSERT INTO support_interaction(count,employee_id,lead_id,trainee_id, date,lead,created_date, description) VALUES (?,?,?,?,?,?,?,?)";
	public static final String SUPPORT_INTERACTION_SELECT = "SELECT si.*, si.id as 'id',e.name as 'employee',tre.name as 'trainee' FROM support_interaction si,employee e,trainee tre WHERE si.employee_id = e.id AND tre.id = si.trainee_id";
	public static final String SUPPORT_INTERACTION_UPDATE = "UPDATE support_interaction SET count=?, employee_id=?,lead_id=?,trainee_id=?,date=?,lead=?,updated_date=?, description=? WHERE id = ?";
	public static final String TRAINING_SUMMARY = "select te.name as name,ba.id as batch_id,count(tr.id) as count_batch,ba.start_date as start_date,ba.end_date,ba.status as status from batch ba left outer join trainee tr on ba.id = tr.batch_id left outer join trainer te on ba.trainer_id = te.id where ba.status in('1 - In Progress','3 - Payment Pending') group by ba.id";
	public static final String INTERVIEW_SUMMARY = "SELECT c.name as consultancy,e.name as employee_name,tr.name as trainee_name,i.date as interview_date,i.interviewer as client,i.status FROM interview i left outer join client c on i.client_id = c.id left outer join trainee tr on i.trainee_id = tr.id left outer join employee e on i.assisted_by=e.id where i.status in ('2 - In Progress','5 - Payment Pending') order by i.created_date desc";
	public static final String SUPPORT_SUMMARY = "SELECT s.start_date as start,s.end_date as end,tr.name as trainee_name,e.name as supported_by FROM support s left outer join trainee tr on s.trainee_id=tr.id left outer join employee e on s.supported_by=e.id where status in('3-In Progress','3 - Payment Pending') order by s.start_date asc";

	public static final String PAYMENT_SELECT = "select c.*,group_concat(co.id) AS poc_ids ,group_concat(co.poc) AS poc, "
			+ "group_concat(CONCAT(co.poc,'('),CONCAT(co.designation,')'),CONCAT(co.phone,'\n')) AS contacts, "
			+ "group_concat(co.designation) AS des, group_concat(co.phone) AS phone,group_concat(co.email) AS email from client c,"
			+ " contact co where c.id= co.client_id AND c.active_flag=0 Group By co.client_id ORDER BY id desc";
	public static final String PAYMENT_INSERT = "INSERT INTO client (name, address,created_date,description) values(?, ?, ?,?)";
	public static final String PAYMENT_DELETE = "UPDATE client set active_flag=1   WHERE id = ?";
	public static final String PAYMENT_UPDATE = "UPDATE client set name=?, address=?,updated_date=?,description=? WHERE id = ?";
	public static final String PAYMENT_SELECT_BY_ID = "SELECT * FROM client where id = ?";
	public static final String PAYMENT_DASHBOARD = "SELECT tr.name as 'candidatename',cl.name AS clientName ,'Training' as category , tr.name AS assistedBy From trainee tr, batch b ,client cl where cl.id= tr.client_id AND b.id = tr.batch_id AND b.status IN (SELECT status from batch b where b.status = '3 - Payment Pending') UNION SELECT tr.name as 'name' ,cl.name AS client ,'Interview' as category , e.name AS assistedBy FROM interview i, trainee tr, client cl, employee e where i.status ='3 - Payment Pending' AND i.trainee_id=tr.id AND cl.id = tr.client_id AND i.assisted_by = e.id union SELECT tr.name as 'name' , cl.name AS client ,'Support' as category , e.name AS assistedBy FROM support s , trainee tr ,client cl,employee e where s.status ='3 - Payment Pending' AND s.trainee_id=tr.id AND cl.id = tr.client_id AND s.supported_by = e.id";;

	public static final String USER_ROLE_SELECT = "SELECT * FROM user_role where active_flag=0";
	public static final String USER_ROLE_INSERT = "INSERT INTO user_role (name,created_date,description) values(?,?,?)";
	public static final String USER_ROLE_UPDATE = "UPDATE user_role set name=?,updated_date=?,description=? WHERE id = ?";
	public static final String USER_ROLE_DELETE = "UPDATE user_role set active_flag=1 WHERE id = ?";
	public static final String USER_ROLE_SELECT_BY_ID = "SELECT * FROM user_role where id = ?";

	public static final String EMPLOYEE_DESIGNATION_SELECT = "SELECT * FROM employee_designation where active_flag=0";
	public static final String EMPLOYEE_DESIGNATION_INSERT = "INSERT INTO employee_designation (designation,created_date,description) values(?,?,?)";
	public static final String EMPLOYEE_DESIGNATION_DELETE = "UPDATE employee_designation set active_flag=1 WHERE id = ?";
	public static final String EMPLOYEE_DESIGNATION_UPDATE = "UPDATE employee_designation set designation=?,updated_date=?,description=? WHERE id = ?";
	public static final String EMPLOYEE_DESIGNATION_SELECT_BY_ID = "SELECT * FROM employee_designation where id = ?";

	public static final String BATCH_ATTENDANCE_SELECT = "SELECT * FROM batch_attendance where active_flag=0 ORDER BY batch_id asc";
	
	public static final String BATCH_ATTENDANCE_SELECT_BY_BATCH_ID = "SELECT id,name FROM `trainee` WHERE  batch_id = ?";
	public static final String BATCH_ATTENDANCE_INSERT = "INSERT INTO batch_attendance (batch_id,date,trainee_id,created_date,description) values(?,?,?,?,?)";
	public static final String BATCH_ATTENDANCE_UPDATE = "UPDATE batch_attendance set batch_id=?,date=?,trainee_id=?,updated_date=?,description=? WHERE id = ?";
	public static final String BATCH_ATTENDANCE_DELETE = "UPDATE batch_attendance set active_flag=1 WHERE id = ?";
	public static final String BATCH_ATTENDANCE_SELECT_BY_ID = "SELECT * FROM batch where id = ?";

	public static final String TIME_SHEET_SELECT = "SELECT * FROM time_sheet where active_flag=0 ORDER BY date asc";
	public static final String TIME_SHEET_SELECT_BY_ID = "SELECT * FROM time_sheet where id = ?";
	public static final String TIME_SHEET_INSERT = "INSERT INTO time_sheet (date,emploee_id,category,category_ref_no,duration_in_hours,created_date,description) values(?,?,?,?,?,?,?)";
	public static final String TIME_SHEET_UPDATE = "UPDATE time_sheet set date=?,emploee_id=?,category=?,category_ref_no=?,duration_in_hours=?,updated_date=?,description=? WHERE id = ?";
	public static final String TIME_SHEET_DELETE = "UPDATE time_sheet set active_flag=1 WHERE id = ?";
}
