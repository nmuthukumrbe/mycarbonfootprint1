/**
 * 
 */
package com.fixxar.appyTailor.web.builder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.math.NumberUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.fixxar.appyTailor.common.VelocityUtil;
import com.fixxar.appyTailor.dao.AppUserDAO;
import com.fixxar.appyTailor.dao.TripDAO;
import com.fixxar.appyTailor.dao.TripUserDAO;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.TripTO;
import com.fixxar.appyTailor.model.TripUserTO;
import com.fixxar.appyTailor.web.interceptor.RequestUtil;


/**
 * @author Muthu
 *
 */
@Component
@Transactional
public class HomeBuilder {

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private HttpServletRequest context;

	@Autowired
	AppUserDAO userDAO;
		
	@Autowired
	TripDAO tripDAO;
	
	@Autowired
	TripUserDAO tripUserDAO;
	
	/**
	 * 
	 * @param user
	 * @return
	 */
	public boolean validateLogin(AppUserTO user, HttpServletRequest request, String company) {
		TripTO companyTO = new TripTO();
		companyTO.setName(company);
		log.info("In Validate Login "+ user.getName() + ", pass=" + user.getPassword() + ", company="+company);
		log.info("After get company  "+ companyTO.getName() + ",compay Id" + companyTO.getId());
		user = userDAO.getAppUser(user);
		if(user != null && user.getId() > 0){
			log.info("user session creation in progress");
			RequestUtil.createUserSession(request, user);
			log.info("user session created");
			return true;
		} else {
			log.info("there is no company, so exiting");
			return false;
		}
	}
	
	/**
	 * 
	 * 
	 * @param user
	 * @return
	 */
	public void logoutAction(HttpServletRequest request) {
		RequestUtil.clearUserSession(request);
	}

	public String loadUploadPage(){
		Map<String, Object> context = new HashMap<String, Object>();
		return VelocityUtil.getInstance().build(context, "upload/upload.html");
	}
	
	public String mySaving(){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		List<TripUserTO> tripUserList = tripUserDAO.getAllTripUser(appUserTO);
		context.put("tripUsers", tripUserList);
		double kmTravel = 0, carbonSaving = 0;
		for(TripUserTO tripUserTO : tripUserList){
			double km = Math.round(NumberUtils.toDouble(tripUserTO.getKmTravel()) * 100.0) / 100.0;
			double cs = Math.round(NumberUtils.toDouble(tripUserTO.getCarbonSaving()) * 100.0) / 100.0;
			tripUserTO.setKmTravel(String.valueOf(km));
			tripUserTO.setCarbonSaving(String.valueOf(cs));
			carbonSaving += cs;
			kmTravel += km;
		}
		context.put("kmTravel", kmTravel);
		context.put("carbonSaving", carbonSaving);
		return VelocityUtil.getInstance().build(context, "trip/mySaving.html");
	}

	public String myInfo(){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("appUser", appUserTO);
		return VelocityUtil.getInstance().build(context, "trip/myInfo.html");
	}
	
	public String leadershipBoard(){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("appUser", appUserTO);
		return VelocityUtil.getInstance().build(context, "trip/leadershipBoard.html");
	}
	
}
