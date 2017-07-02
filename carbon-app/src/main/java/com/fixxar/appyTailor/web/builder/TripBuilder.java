/**
 * 
 */
package com.fixxar.appyTailor.web.builder;

import java.util.Date;
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

import com.fixxar.appyTailor.common.Utils;
import com.fixxar.appyTailor.common.VelocityUtil;
import com.fixxar.appyTailor.dao.TripDAO;
import com.fixxar.appyTailor.dao.TripUserDAO;
import com.fixxar.appyTailor.model.AppUserTO;
import com.fixxar.appyTailor.model.RestResponse;
import com.fixxar.appyTailor.model.TripTO;
import com.fixxar.appyTailor.model.TripUserTO;
import com.fixxar.appyTailor.web.interceptor.RequestUtil;

/**
 * @author Muthu
 *
 */
@Component
@Transactional
public class TripBuilder {

	private Log log = LogFactory.getLog(this.getClass());
	
	@Autowired
	private HttpServletRequest context;
	
	@Autowired
	TripDAO tripDAO;
	
	@Autowired
	TripUserDAO tripUserDAO;
	
	@Autowired
	TripUserBuilder tripUserBuilder;
	
	/**	
	 * 
	 * @return
	 */
	public String getAllTrip(TripTO tripTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		List<TripTO> tripList = tripDAO.getAllTrip(tripTO, appUserTO);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("tripList", tripList);
		context.put("tripTO", tripTO);
		return VelocityUtil.getInstance().build(context, "trip/manage-trip.html");
	}
	
	/**	
	 * 
	 * @return
	 */
	public String searchTrip(TripTO tripTO){
		
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
		
		List<TripTO> tripList = tripDAO.getAllTrip(tripTO, appUserTO);
		Map<String, Object> context = new HashMap<String, Object>();
		context.put("tripList", tripList);
		context.put("tripTO", tripTO);
		return VelocityUtil.getInstance().build(context, "trip/trip-pagination.html");
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public int saveTrip(TripTO tripTO){
		int tripId = 0;
		try{
			AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
			tripTO.setUserId(appUserTO.getId());
			tripTO.setOrganizer(appUserTO.getId());
			tripTO.setLastUpdatedDate(Utils.getStrDate(new Date()));
			if(tripTO.getId() > 0 ){
				tripId = tripDAO.saveTrip(tripTO);
			} else {
				tripId = tripDAO.saveTrip(tripTO);
			}
			tripTO.setId(tripId);
			this.saveTripUser(appUserTO.getId(), tripTO);
		} catch(Exception e){
			log.error("Error in TripBuilder:saveTrip", e);
		}
		return tripId;
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public int startTrip(TripTO tripTO){
		try{
			AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
			tripTO = tripDAO.getTrip(tripTO);
			tripTO.setLastUpdatedDate(Utils.getStrDate(new Date()));
			if(tripTO.getOrganizer()!=appUserTO.getId()){
				tripTO.setStatus(1);//started
				if(tripTO.getId() > 0 ){
					return tripDAO.saveTrip(tripTO);
				} else {
					return tripDAO.saveTrip(tripTO);
				}
			} else {
				//Start User Trip
				
			}
		} catch(Exception e){
			log.error("Error in TripBuilder:startTrip", e);
		}
		return 0;
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public int stopTrip(TripTO tripTO){
		try{
			AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();
			String lat = tripTO.getToLat();
			String lng = tripTO.getToLong();
			tripTO = tripDAO.getTrip(tripTO);
			tripTO.setLastUpdatedDate(Utils.getStrDate(new Date()));
			if(lat.equals(tripTO.getFromLat())){
				lat = String.valueOf(NumberUtils.toDouble(lat));
			}
			if(lng.equals(tripTO.getFromLong())){
				lng = String.valueOf(NumberUtils.toDouble(lng)+0.2);
			}
			double distance = DistanceCalculator.distance(NumberUtils.toDouble(tripTO.getFromLat()), NumberUtils.toDouble(tripTO.getFromLong()), 
					NumberUtils.toDouble(lat), NumberUtils.toDouble(lng), "K");
			tripTO.setKmTravel(String.valueOf(distance));
			//car efficiency 10 KM
			//1 litre petrol = 2.5k.g of co2
			tripTO.setCarbonSaving(String.valueOf((double)(distance/10)*2.5));
			//End trip
			if(tripTO.getOrganizer() != appUserTO.getId()){
				tripTO.setToLat(lat);
				tripTO.setToLong(lng);
				tripTO.setStatus(2);//ended
				List<TripUserTO> tripUserList = tripUserDAO.getTripUserList(tripTO);
				if(tripUserList.size()>2){
					tripTO.setCarbonSaving(String.valueOf(NumberUtils.toDouble(tripTO.getCarbonSaving())*(tripUserList.size()-1)));
				}
				for(TripUserTO tripUserTO : tripUserList){
					this.updateTripUser(tripUserTO, tripTO);
				}
				if(tripTO.getId() > 0 ){
					return tripDAO.saveTrip(tripTO);
				} else {
					return tripDAO.saveTrip(tripTO);
				}
			} else {
				//End Trip User
				tripTO.setToLat(lat);
				tripTO.setToLong(lng);
				tripTO.setStatus(2);//ended
				List<TripUserTO> tripUserList = tripUserDAO.getTripUserList(tripTO);
				if(tripUserList.size()>2){
					tripTO.setCarbonSaving(String.valueOf(NumberUtils.toDouble(tripTO.getCarbonSaving())*(tripUserList.size()-1)));
				}
				for(TripUserTO tripUserTO : tripUserList){
					this.updateTripUser(tripUserTO, tripTO);
				}
				if(tripTO.getId() > 0 ){
					return tripDAO.saveTrip(tripTO);
				} else {
					return tripDAO.saveTrip(tripTO);
				}
			}
		} catch(Exception e){
			log.error("Error in TripBuilder:stopTrip", e);
		}
		return 0;
	}
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public String addEditTrip(TripTO tripTO, boolean isFromOrder){
		Map<String, Object> context = new HashMap<String, Object>();
		if(tripTO!=null & tripTO.getId()>0){
			tripTO = tripDAO.getTrip(tripTO);
			context.put("trip", tripTO);
		}
		if(isFromOrder){
			context.put("order", true);
		} else {
			context.put("order", false);
		}
		return VelocityUtil.getInstance().build(context, "trip/add-trip.html");
	}
	
	public String addEditTripImage(TripTO tripTO){
		Map<String, Object> context = new HashMap<String, Object>();
		if(tripTO!=null & tripTO.getId()>0){
			tripTO = tripDAO.getTrip(tripTO);
			context.put("trip", tripTO);
		}
		return VelocityUtil.getInstance().build(context, "trip/add-cust-image.html");
	}
	
	/**
	 * 
	 * @param tripTO
	 */
	public boolean deleteTrip(TripTO tripTO){
		tripDAO.deleteTrip(tripTO);
		return true;
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public RestResponse findTrip(TripTO tripTO){
		RestResponse res = new RestResponse();
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();   // 1st
		Map<String, Object> context = new HashMap<String, Object>();
		tripTO.setUserId(appUserTO.getId());
		TripTO trip = this.tripDAO.getTripByTripUser(tripTO);
		if(trip == null){
			res.setMessage(VelocityUtil.getInstance().build(context, "trip/find-trip.html"));
		} else {
			res = this.tripDetails(trip);
		}
		res.setAckType("Success");
		return res;
	}
	
	/**
	 * 
	 * @param tripTO
	 * @return
	 */
	public RestResponse tripDetails(TripTO tripTO){
		RestResponse res = new RestResponse();
		AppUserTO appUserTO = RequestUtil.getUserFromSession(context).getAppUserTO();   // 1st
		Map<String, Object> context = new HashMap<String, Object>();
		if(tripTO.getUserId()==0){
			tripTO.setUserId(appUserTO.getId());
			tripTO = tripDAO.getActiveTrip(tripTO);    //2nd
		} else {
			tripTO = tripDAO.getActiveTrip(tripTO);    //2nd
			//Scan and Add user to trip
			this.saveTripUser(appUserTO.getId(), tripTO);
		}
		if(tripTO != null && tripTO.getId() > 0){
			context.put("trip", tripTO); //4
			context.put("tripUsers", tripUserDAO.getTripUserList(tripTO)); //4
			if(tripTO.getOrganizer() == appUserTO.getId()){
				context.put("organizer", true);
			}
			res.setMessage(VelocityUtil.getInstance().build(context, "trip/trip-details.html"));
			res.setObject("QR");
		} else {
			res.setMessage(VelocityUtil.getInstance().build(context, "trip/add-trip.html"));
		}
		res.setAckType("Success");
		return res;
	}
	
	/**
	 * Save User to Trip
	 * 
	 * @param id
	 * @param tripTO
	 */
	private void saveTripUser(int id, TripTO tripTO) {
		TripUserTO tripUserTO = new TripUserTO();
		tripTO.setUserId(id);
		if(this.tripUserBuilder.getTripUser(tripTO) ==  null){
			tripUserTO.setUserId(id);
			tripUserTO.setStFromLat(tripTO.getFromLat());
			tripUserTO.setStFromLong(tripTO.getFromLong());
			tripUserTO.setTripId(tripTO.getId());
			tripUserTO.setPayForRide(1);
			tripUserTO.setEndToLat(tripTO.getToLat());
			tripUserTO.setEndToLong(tripTO.getToLong());
			tripUserTO.setKmTravel(tripTO.getKmTravel());
			tripUserTO.setCarbonSaving(tripTO.getCarbonSaving());
			this.tripUserBuilder.saveTripUser(tripUserTO);
		}
	}

	private void updateTripUser(TripUserTO tripUserTO, TripTO tripTO) {
		if(tripUserTO != null){
			tripUserTO.setStFromLat(tripTO.getFromLat());
			tripUserTO.setStFromLong(tripTO.getFromLong());
			tripUserTO.setTripId(tripTO.getId());
			tripUserTO.setPayForRide(1);
			tripUserTO.setEndToLat(tripTO.getToLat());
			tripUserTO.setEndToLong(tripTO.getToLong());
			tripUserTO.setKmTravel(tripTO.getKmTravel());
			tripUserTO.setCarbonSaving(tripTO.getCarbonSaving());
			this.tripUserBuilder.saveTripUser(tripUserTO);
		}
	}
	
	/**
	 * 
	 * @param trip
	 * @return
	 */
	public TripTO getTrip(TripTO trip) {
		return tripDAO.getTrip(trip);
	}
	
}
