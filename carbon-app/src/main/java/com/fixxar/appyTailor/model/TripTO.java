package com.fixxar.appyTailor.model;

import javax.persistence.Entity;

/**
 * 
 * CREATE TABLE trip(id INTEGER PRIMARY KEY AUTOINCREMENT, user_id int, name varchar(50), last_updated_date datetime, organizer int, 
from_lat varchar(50), from_long varchar(50), to_lat varchar(50), to_long varchar(50),km_travel varchar(50), carbon_saving varchar(50));

 * @author mnagappan
 *
 */
@Entity
public class TripTO {
	
	private int id;
	private int userId;
	private String name;
	private String lastUpdatedDate;
	private int organizer;
	private int status;
	private String fromLat;
	private String fromLong;
	private String toLat;
	private String toLong;
	private String kmTravel;
	private String carbonSaving;
		
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getLastUpdatedDate() {
		return lastUpdatedDate;
	}
	public void setLastUpdatedDate(String lastUpdatedDate) {
		this.lastUpdatedDate = lastUpdatedDate;
	}
	public int getOrganizer() {
		return organizer;
	}
	public void setOrganizer(int organizer) {
		this.organizer = organizer;
	}
	public String getFromLat() {
		return fromLat;
	}
	public void setFromLat(String fromLat) {
		this.fromLat = fromLat;
	}
	public String getFromLong() {
		return fromLong;
	}
	public void setFromLong(String fromLong) {
		this.fromLong = fromLong;
	}
	public String getToLat() {
		return toLat;
	}
	public void setToLat(String toLat) {
		this.toLat = toLat;
	}
	public String getToLong() {
		return toLong;
	}
	public void setToLong(String toLong) {
		this.toLong = toLong;
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
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
}