/**
 * 
 */
package com.fixxar.appyTailor.web.builder;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.fixxar.appyTailor.common.Utils;
import com.fixxar.appyTailor.common.VelocityUtil;
import com.fixxar.appyTailor.dao.AppUserDAO;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.model.UserTypeEnum;
import com.fixxar.appyTailor.web.interceptor.RequestUtil;

/**
 * @author Muthu
 *
 */
@Component
@Transactional
public class AppUserBuilder {

	@Autowired
	private HttpServletRequest context;
	
	private Log log = LogFactory.getLog(this.getClass());

	@Autowired AppUserDAO appUserDAO;
	
	/**	
	 * 
	 * @return
	 */
	public String getAllAppUser(){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();		
		List<AppUserTO> appUserList = appUserDAO.getAllAppUsers(appUserTO);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("appUserList", appUserList);
		context.put("userTypes", UserTypeEnum.values());
		return VelocityUtil.getInstance().build(context, "appUser/manage-appUser.html");
	}
	
	/**
	 * 
	 * @param appUserTO
	 * @return
	 */
	public void saveAppUser(AppUserTO appUserTO, RestResponse res){
		AppUserTO appUser = RequestUtil.getUserFromSession(context).getAppUserTO();
		try{
			appUserTO.setLastUpdatedDate(Utils.getStrDate(new Date()));			
		} catch(Exception e){
			log.error("Error in AppUserBuilder:saveAppUser", e);
		}
		int id = appUserDAO.save(appUserTO);
		res.setAckType("Success");
		res.setMessage("AppUser Saved Successfully");
	}
	
	/**
	 * 
	 * @param appUserTO
	 * @return
	 */
	public String addEditAppUser(AppUserTO appUserTO){
		
		AppUserTO appUser = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		UserTypeEnum[] userTypeList = null;
		if(appUserTO!=null & appUserTO.getId()>0){
			appUserTO = appUserDAO.getAppUser(appUserTO);
			context.put("appUser", appUserTO);
		}
		return VelocityUtil.getInstance().build(context, "appUser/add-appUser.html");
	}
	
	/**
	 * 
	 * @param appUserTO
	 */
	public boolean deleteAppUser(AppUserTO appUserTO){
		try {
			appUserDAO.deleteAppUser(appUserTO);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * 
	 * @param appUserTO
	 * @return
	 */
	public String appUserDetails(AppUserTO appUserTO){
		Map<String, Object> context = new HashMap<String, Object>();
		if(appUserTO!=null & appUserTO.getId()>0){
			appUserTO = appUserDAO.getAppUser(appUserTO);
			context.put("appUser", appUserTO);
		}
		context.put("userTypes", UserTypeEnum.values());
		return VelocityUtil.getInstance().build(context, "appUser/appUser-details.html");
	}
	
}
