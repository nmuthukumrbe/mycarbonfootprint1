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
public class TripUserBuilder {

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private HttpServletRequest context;
	
	@Autowired
	TripUserDAO tripUserDAO;
	
	/**	
	 * 
	 * @return
	 */
	public String getAllTripUser(TripUserTO tripUserTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("tripUserTO", tripUserTO);
		return VelocityUtil.getInstance().build(context, "tripUser/manage-tripUser.html");
	}
	
	public TripUserTO getTripUser(TripTO tripTO){
		return tripUserDAO.getTripUser(tripTO);
	}

	/**	
	 * 
	 * @return
	 */
	public String searchTripUser(TripUserTO tripUserTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		
		List<TripUserTO> tripUserList = tripUserDAO.getAllTripUser(appUserTO);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("tripUserList", tripUserList);
		context.put("tripUserTO", tripUserTO);
		return VelocityUtil.getInstance().build(context, "tripUser/tripUser-pagination.html");
	}
	
	/**
	 * 
	 * @param tripUserTO
	 * @return
	 */
	public int saveTripUser(TripUserTO tripUserTO){
		try{
			AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
			tripUserTO.setLastUpdatedDate(Utils.getStrDate(new Date()));
			if(tripUserTO.getId() > 0 ){
				return tripUserDAO.saveTripUser(tripUserTO);
			} else {
				return tripUserDAO.saveTripUser(tripUserTO);
			}
		} catch(Exception e){
			log.error("Error in TripUserBuilder:saveTripUser", e);
		}
		return 0;
	}
	
	/**
	 * 
	 * @param tripUserTO
	 * @return
	 */
	public String addEditTripUser(TripUserTO tripUserTO, boolean isFromOrder){
		Map<String, Object> context = new HashMap<String, Object>();
		if(tripUserTO!=null & tripUserTO.getId()>0){
			/*tripUserTO = tripUserDAO.getTripUser(tripUserTO);*/
			context.put("tripUser", tripUserTO);
		}
		if(isFromOrder){
			context.put("order", true);
		} else {
			context.put("order", false);
		}
		return VelocityUtil.getInstance().build(context, "tripUser/add-tripUser.html");
	}
	
	public String addEditTripUserImage(TripUserTO tripUserTO){
		Map<String, Object> context = new HashMap<String, Object>();
		if(tripUserTO!=null & tripUserTO.getId()>0){
			/*tripUserTO = tripUserDAO.getTripUser(tripUserTO);*/
			context.put("tripUser", tripUserTO);
		}
		return VelocityUtil.getInstance().build(context, "tripUser/add-cust-image.html");
	}
	
	/**
	 * 
	 * @param tripUserTO
	 */
	public boolean deleteTripUser(TripUserTO tripUserTO){
		tripUserDAO.deleteTripUser(tripUserTO);
		return true;
	}
	
	/**
	 * 
	 * @param tripUserTO
	 * @return
	 */
	public String tripUserDetails(TripUserTO tripUserTO){
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();   // 1st
		Map<String, Object> context = new HashMap<String, Object>();
		/*tripUserTO = tripUserDAO.getTripUser(tripUserTO);    //2nd
*/		if(tripUserTO != null & tripUserTO.getId() > 0){
			context.put("tripUser", tripUserTO); //4 
		}
		return VelocityUtil.getInstance().build(context, "tripUser/tripUser-details.html");
	}
	
	
	
}
