package com.fixxar.appyTailor.model;

import javax.persistence.Entity;

/**
 * 
CREATE TABLE trip_user(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, trip_id int, st_from_lat varchar(50), st_from_long varchar(50), 
end_from_long varchar(50), end_from_long varchar(50), km_travel varchar(50), carbon_saving varchar(50), pay_for_ride varchar(50), updated_date datetime);
 * @author mnagappan
 *
 */
@Entity
public class TripUserTO {
	
	private int id;
	private int userId;
	private AppUserTO userTO;
	private int tripId;
	private String stFromLat;
	private String stFromLong;
	private String endToLat;
	private String endToLong;
	private String kmTravel;
	private String carbonSaving;
	private int payForRide;
	private String lastUpdatedDate;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getTripId() {
		return tripId;
	}
	public void setTripId(int tripId) {
		this.tripId = tripId;
	}
	public String getStFromLat() {
		return stFromLat;
	}
	public void setStFromLat(String stFromLat) {
		this.stFromLat = stFromLat;
	}
	public String getStFromLong() {
		return stFromLong;
	}
	public void setStFromLong(String stFromLong) {
		this.stFromLong = stFromLong;
	}
	public String getEndToLat() {
		return endToLat;
	}
	public void setEndToLat(String endToLat) {
		this.endToLat = endToLat;
	}
	public String getEndToLong() {
		return endToLong;
	}
	public void setEndToLong(String endToLong) {
		this.endToLong = endToLong;
	}
	public String getKmTravel() {
		return kmTravel;
	}
	public void setKmTravel(String kmTravel) {
		this.kmTravel = kmTravel;
	}
	public String getCarbonSaving() {
		return carbonSaving;
	}
	public void setCarbonSaving(String carbonSaving) {
		this.carbonSaving = carbonSaving;
	}
	public String getLastUpdatedDate() {
		return lastUpdatedDate;
	}
	public void setLastUpdatedDate(String lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}
	public int getPayForRide() {
		return payForRide;
	}
	public void setPayForRide(int payForRide) {
		this.payForRide = payForRide;
	}
	public AppUserTO getUserTO() {
		return userTO;
	}
	public void setUserTO(AppUserTO userTO) {
		this.userTO = userTO;
	}
		
}